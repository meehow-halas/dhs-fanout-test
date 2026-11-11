import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

function projectRoot(start) {
  let dir = start;
  while (dir && dir !== path.dirname(dir)) {
    if (existsSync(path.join(dir, ".dhs", "scripts", "check-update"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return start;
}

function updateNotice(cwd) {
  try {
    const script = path.join(cwd, ".dhs", "scripts", "check-update");
    const result = spawnSync("sh", [script, "--host", "opencode"], {
      cwd,
      encoding: "utf8",
      timeout: 15000,
      env: { ...process.env, DHS_CHECK_ROOT: cwd },
    });
    return String(result.stdout || "").trim();
  } catch {
    return "";
  }
}

function sessionIdFrom(event) {
  if (!event || typeof event !== "object") {
    return "";
  }
  const data = event.data || event.properties || {};
  return String(data.sessionID || event.sessionID || "").trim();
}

async function injectNotice(ctx, sessionID, text) {
  if (!text) {
    return;
  }
  const put = ctx && ctx.session && ctx.session.instructions && ctx.session.instructions.entry
    ? ctx.session.instructions.entry.put
    : null;
  if (typeof put !== "function") {
    return;
  }
  await put.call(ctx.session.instructions.entry, {
    sessionID,
    key: "dhs-update",
    value: text,
  });
}

export async function DhsCheckUpdate(ctx) {
  return {
    event: async ({ event } = {}) => {
      try {
        if (!event || event.type !== "session.created") {
          return;
        }
        const cwd = projectRoot(
          (ctx && (ctx.directory || ctx.worktree)) || process.cwd()
        );
        const text = updateNotice(cwd);
        if (!text) {
          return;
        }
        await injectNotice(ctx, sessionIdFrom(event), text);
      } catch {
        // fail-open
      }
    },
  };
}

export default DhsCheckUpdate;
