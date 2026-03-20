#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current version from package.json
const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const currentVersion = packageJson.version;

// Update AppMasthead.vue with the new version
const mastheadPath = path.join(__dirname, 'src/components/layout/AppMasthead.vue');
const mastheadContent = fs.readFileSync(mastheadPath, 'utf8');

// Replace the version line
const updatedContent = mastheadContent.replace(
  /const version = "[\d.]+"; \/\/ This will be updated automatically by deployment scripts/,
  `const version = "${currentVersion}"; // This will be updated automatically by deployment scripts`
);

fs.writeFileSync(mastheadPath, updatedContent);
console.log(`Updated version to v${currentVersion} in AppMasthead.vue`);
