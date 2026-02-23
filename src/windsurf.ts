import { execFile } from "child_process";
import { showToast, Toast } from "@raycast/api";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

type CommandStep = {
  command: string;
  args: string[];
  label: string;
};

async function runWithFallback(steps: CommandStep[]): Promise<void> {
  let lastError: unknown;

  for (const step of steps) {
    try {
      await execFileAsync(step.command, step.args);
      return;
    } catch (error) {
      lastError = error;
      console.log(`[Windsurf] ${step.label} failed`, error);
    }
  }

  throw lastError ?? new Error("All fallback commands failed");
}

/**
 * Opens a project in Windsurf
 * Preferred order for reliability on macOS:
 * 1. URL scheme: windsurf://file/{path}
 * 2. macOS open command: open -a Windsurf {path}
 * 3. CLI command: windsurf {path}
 */
export async function openProjectInWindsurf(
  projectPath: string,
  closeOthers = false
): Promise<void> {
  const urlPath = encodeURIComponent(projectPath);
  const url = closeOthers
    ? `windsurf://file/${urlPath}?command=open-new-window`
    : `windsurf://file/${urlPath}`;

  const openArgs = closeOthers
    ? ["-a", "Windsurf", "--new", projectPath]
    : ["-a", "Windsurf", projectPath];

  try {
    await runWithFallback([
      {
        command: "open",
        args: [url],
        label: "open URL scheme",
      },
      {
        command: "open",
        args: openArgs,
        label: "open -a Windsurf",
      },
      {
        command: "windsurf",
        args: [projectPath],
        label: "windsurf CLI",
      },
    ]);
  } catch (error) {
    console.error("Error opening project in Windsurf:", error);
    await showToast(
      Toast.Style.Failure,
      "Failed to open project in Windsurf",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
}

/**
 * Opens a new Windsurf window
 */
export async function openNewWindsurfWindow(): Promise<void> {
  try {
    await runWithFallback([
      {
        command: "open",
        args: ["-na", "Windsurf", "--args", "-n"],
        label: "open -na Windsurf --args -n",
      },
      {
        command: "windsurf",
        args: ["-n"],
        label: "windsurf -n",
      },
      {
        command: "windsurf",
        args: ["--new-window"],
        label: "windsurf --new-window",
      },
    ]);
  } catch (error) {
    console.error("Error opening new Windsurf window:", error);
    await showToast(
      Toast.Style.Failure,
      "Failed to open new Windsurf window",
      error instanceof Error ? error.message : "Make sure Windsurf is installed"
    );
    throw error;
  }
}
