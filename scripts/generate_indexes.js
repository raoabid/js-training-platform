// scripts/generate_indexes.js

const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

/**
 * Function to generate the root index.html
 * @param {Array} projects - List of project objects
 * @param {string} templatesDir - Path to the templates directory
 * @param {string} outputPath - Path where the root index.html will be saved
 */
async function generateRootIndex(projects, templatesDir, outputPath) {
    try {
        const rootTemplate = path.join(templatesDir, 'root_index.ejs');

        // Check if the root template exists
        if (!await fs.pathExists(rootTemplate)) {
            console.error(`❌ Root template not found at ${rootTemplate}`);
            return;
        }

        const rootHtml = await ejs.renderFile(rootTemplate, { projects });
        await fs.writeFile(outputPath, rootHtml);
        console.log('✅ Generated root/index.html');
    } catch (error) {
        console.error('❌ Error generating root index.html:', error);
    }
}

/**
 * Function to generate index.html and script.js for each project in start and final directories
 * @param {Array} projects - List of project objects
 * @param {string} templatesDir - Path to the templates directory
 * @param {string} startDir - Path to the start directory
 * @param {string} finalDir - Path to the final directory
 */
async function generateProjectIndexes(projects, templatesDir, startDir, finalDir) {
    for (const project of projects) {
        const { id, name, title, startCodePen, finalCodePen } = project;

        // Define project directory names
        const projectDirName = `${id}-${name}`;
        const startProjectDir = path.join(startDir, projectDirName);
        const finalProjectDir = path.join(finalDir, projectDirName);

        try {
            // Ensure project directories exist
            await fs.ensureDir(startProjectDir);
            await fs.ensureDir(finalProjectDir);

            // ----------------- Generate Start Index.html -----------------
            const startTemplate = path.join(templatesDir, 'start_index.ejs');
            const startOutput = path.join(startProjectDir, 'index.html');

            // Check if start template exists
            if (!await fs.pathExists(startTemplate)) {
                console.error(`❌ Start template not found at ${startTemplate}`);
                continue;
            }

            // Check if start/index.html already exists
            if (await fs.pathExists(startOutput)) {
                console.log(`🔄 start/${projectDirName}/index.html already exists. Skipping generation.`);
            } else {
                const startHtml = await ejs.renderFile(startTemplate, { project });
                await fs.writeFile(startOutput, startHtml);
                console.log(`✅ Generated start/${projectDirName}/index.html`);
            }

            // Create or verify styles.css in start directory
            const startStylesPath = path.join(startProjectDir, 'styles.css');
            if (!await fs.pathExists(startStylesPath)) {
                await fs.writeFile(startStylesPath, `/* start/${projectDirName}/styles.css */\n/* Add your start project styles here */`);
                console.log(`📝 Created start/${projectDirName}/styles.css`);
            } else {
                console.log(`🔄 start/${projectDirName}/styles.css already exists. Skipping creation.`);
            }

            // Create or verify script.js in start directory
            const startScriptPath = path.join(startProjectDir, 'script.js');
            if (!await fs.pathExists(startScriptPath)) {
                await fs.writeFile(startScriptPath, `// start/${projectDirName}/script.js\n// Add your start project scripts here\nconsole.log("start/${projectDirName}/script.js Loaded");`);
                console.log(`📝 Created start/${projectDirName}/script.js`);
            } else {
                console.log(`🔄 start/${projectDirName}/script.js already exists. Skipping creation.`);
            }

            // ----------------- Generate Final Index.html -----------------
            const finalTemplate = path.join(templatesDir, 'final_index.ejs');
            const finalOutput = path.join(finalProjectDir, 'index.html');

            // Check if final template exists
            if (!await fs.pathExists(finalTemplate)) {
                console.error(`❌ Final template not found at ${finalTemplate}`);
                continue;
            }

            // Check if final/index.html already exists
            if (await fs.pathExists(finalOutput)) {
                console.log(`🔄 final/${projectDirName}/index.html already exists. Skipping generation.`);
            } else {
                const finalHtml = await ejs.renderFile(finalTemplate, { project });
                await fs.writeFile(finalOutput, finalHtml);
                console.log(`✅ Generated final/${projectDirName}/index.html`);
            }

            // Create or verify styles.css in final directory
            const finalStylesPath = path.join(finalProjectDir, 'styles.css');
            if (!await fs.pathExists(finalStylesPath)) {
                await fs.writeFile(finalStylesPath, `/* final/${projectDirName}/styles.css */\n/* Add your final project styles here */`);
                console.log(`📝 Created final/${projectDirName}/styles.css`);
            } else {
                console.log(`🔄 final/${projectDirName}/styles.css already exists. Skipping creation.`);
            }

            // Create or verify script.js in final directory
            const finalScriptPath = path.join(finalProjectDir, 'script.js');
            if (!await fs.pathExists(finalScriptPath)) {
                await fs.writeFile(finalScriptPath, `// final/${projectDirName}/script.js\n// Add your final project scripts here`);
                console.log(`📝 Created final/${projectDirName}/script.js`);
            } else {
                console.log(`🔄 final/${projectDirName}/script.js already exists. Skipping creation.`);
            }

        } catch (error) {
            console.error(`❌ Error processing project "${title}":`, error);
        }
    }
}

/**
 * Main function to orchestrate the generation of indexes
 */
async function generate() {
    try {
        const repoRoot = path.resolve(__dirname, '..');
        const projectsFile = path.join(repoRoot, 'projects.json');

        // Check if projects.json exists
        if (!await fs.pathExists(projectsFile)) {
            console.error('❌ projects.json not found. Please ensure it exists in the root directory.');
            process.exit(1);
        }

        const projectsData = await fs.readJSON(projectsFile);
        const projects = projectsData.projects;

        // Validate projects array
        if (!Array.isArray(projects) || projects.length === 0) {
            console.error('❌ No projects found in projects.json.');
            process.exit(1);
        }

        const templatesDir = path.join(repoRoot, 'templates');
        const startDir = path.join(repoRoot, 'start');
        const finalDir = path.join(repoRoot, 'final');
        const rootOutput = path.join(repoRoot, 'index.html');

        // Generate Root Index
        await generateRootIndex(projects, templatesDir, rootOutput);

        // Generate Project Indexes
        await generateProjectIndexes(projects, templatesDir, startDir, finalDir);

        console.log('\n🎉 Project index generation completed successfully!');
    } catch (error) {
        console.error('❌ Unexpected error during generation:', error);
    }
}

generate();
