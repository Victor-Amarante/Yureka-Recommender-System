#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const project = process.argv[2]; // 'frontend' or 'backend'
const PROJECT_ROOTS = {
  frontend: 'frontend/src',
  backend: 'backend'
};

console.log("Verificando...")

// Get staged files
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
  .toString()
  .split('\n')
  .filter(file => file.startsWith(PROJECT_ROOTS[project]));

// Build dependency graph
const dependencyMap = new Map();

stagedFiles.forEach(file => {
  getDependencies(file).forEach(dep => {
    if (!dependencyMap.has(dep)) {
      dependencyMap.set(dep, []);
    }
    dependencyMap.get(dep).push(file);
  });
});

// Validate commit order
console.log("TOTAL STAGED FILES: ", stagedFiles.length)
stagedFiles.forEach(file => {
  if (dependencyMap.has(file)) {
    const dependents = dependencyMap.get(file);
    console.log("DEPENDENTS: ", dependents)
    const missing = dependents.filter(dep => !stagedFiles.includes(dep));
    
    if (missing.length > 0) {
      console.error(`🚨 ${project.toUpperCase()} DEPENDENCY ERROR:`);
      console.error(`Parent file: ${file}`);
      console.error(`Missing children:`);
      missing.forEach(m => console.error(`- ${m}`));
      process.exit(1);
    }
  }
});

// Helper functions
function getDependencies(file) {
  const content = fs.readFileSync(file, 'utf-8');
  const ext = path.extname(file);
  const deps = [];

  // React components
  if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
    const importRegex = /from\s+['"](\.\/[^'"]+|@\/[^'"]+)['"]|import\s+['"](\.\/[^'"]+|@\/[^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1] || match[2]; // Pega o grupo 1 ou 2
      if (importPath) {
        // Converte alias (@/) para caminho real
        const resolvedPath = importPath.startsWith('@/')
          ? importPath.replace('@', 'src')
          : importPath;
        
        deps.push(resolvePath(file, resolvedPath));
      }
    }
  }


  console.log("CONTENT: ", content)
  console.log("DEPS: ", deps)

  // Python imports
  if (ext === '.py') {
    const regex = /from\s+(\.\S+)\s+import|import\s+(\S+)/g;
    [...content.matchAll(regex)].forEach(match => {
      const importPath = match[1] || match[2];
      if (importPath.startsWith('.')) {
        deps.push(resolvePath(file, importPath));
      }
    });
  }

  return deps.filter(dep => fs.existsSync(dep));
}

function resolvePath(file, importPath) {
  return path.normalize(path.join(path.dirname(file), importPath));
}