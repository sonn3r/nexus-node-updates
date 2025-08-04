const { execSync } = require('child_process');

function run(command: string): string {
  try {
    const output = execSync(command, { stdio: 'pipe' }).toString().trim();
    console.log(`Executed: ${command}`);
    return output;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error while executing: ${command}`);
      console.error(error.message);
    } else {
      console.error(`Unknown error:`, error);
    }
    process.exit(1);
  }
}

function stopServices(): void {
  run('systemctl stop nexus-node.service');
  run('systemctl stop nexus-node-2.service');
}

function startServices(): void {
  run('systemctl start nexus-node.service');
  run('systemctl start nexus-node-2.service');
}

function getVersion(): string {
  return run('/root/.nexus/bin/nexus-network version');
}

function updateNode(): void {
  run('curl https://cli.nexus.xyz/ | sh');
}

function compareVersions(before: string, after: string): void {
  if (before === after) {
    console.error(`Version did not change. Was: ${before}, now: ${after}`);
    process.exit(1);
  } else {
    console.log(`Successfully updated: ${before} → ${after}`);
  }
}

function main(): void {
  console.log('Stopping services...');
  stopServices();

  console.log('Checking current version...');
  const versionBefore = getVersion();

  console.log('Updating node...');
  updateNode();

  console.log('Checking new version...');
  const versionAfter = getVersion();

  console.log('Comparing versions...');
  compareVersions(versionBefore, versionAfter);

  console.log('Starting services again...');
  startServices();

  console.log('Done!');
}

main();
