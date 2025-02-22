# JavaScript Training Platform

This repository serves as a training platform for JavaScript projects. It provides both "Start" and "Final" versions of each project along with auto-generated index pages. This makes it easy for your team to see the evolution of each project from a blank slate to a fully functional application.

Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Installation and Setup](#installation-and-setup)
- [Available Commands](#available-commands)
- [Adding New Projects](#adding-new-projects)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

The JavaScript Training Platform is designed to showcase multiple projects in two stages: the initial "Start" version and the completed "Final" version. Each project has its own folder under the /start and /final directories. The root index.html file lists all projects in a responsive table with links to:

1. **Start:** The initial state of the project.
2. **Final:** The completed project.
3. **GitHub Repo:** Direct link to the final version directory in your GitHub repository.
4. **GitHub Pages:** Direct link to the live GitHub Pages site for the final version.

Global assets (a CSS file and a JavaScript file) are stored in /css/global.css and /js/global.js, respectively.

## Directory Structure
```plaintext
js-training-platform/
├── css/
│   └── global.css
├── js/
│   └── global.js
├── scripts/
│   └── generate_indexes.js    (Script to auto-generate index files)
├── start/                     (Initial versions of projects)
│   └── 01-todo-list/
│       ├── index.html         (Generated from templates/start_index.ejs)
│       ├── styles.css         (Placeholder – editable)
│       └── script.js          (Placeholder – editable)
├── final/                     (Completed versions of projects)
│   └── 01-todo-list/
│       ├── index.html         (Generated from templates/final_index.ejs)
│       ├── styles.css         (Placeholder – editable)
│       └── script.js          (Placeholder – editable)
├── templates/                 (EJS templates for generating index files)
│   ├── root_index.ejs
│   ├── start_index.ejs
│   └── final_index.ejs
├── projects.json              (Project metadata and links)
├── index.html                 (Generated root index file)
├── package.json
└── README.md
```

## Installation and Setup

1. Clone the Repository
```bash   
   git clone https://github.com/yourusername/js-training-platform.git
   cd js-training-platform
```

2. Install Dependencies
   This project uses [EJS](https://ejs.co/) for templating and [fs-extra](https://github.com/jprichardson/node-fs-extra) for file operations.

```bash
   npm install
```
3. Project Configuration

   • Ensure the following directories exist: `/css`, `/js`, `/templates`, `/start`, and `/final`.
   • Verify that projects.json is properly configured with your project metadata.

## Available Commands

### Generate Index Files

This command auto-generates (or updates) the root, start, and final index.html files along with placeholder `styles.css` and `script.js` files for the project directories.
```bash
npm run generate
```

### Start Local Server

This command runs the generation script and then starts a local server (using serve) so you can preview the platform.
```bash
npm run start
```

> Note: If serve is not installed globally, it will be executed using npx.

## Adding New Projects

To add a new project to the platform, follow these steps:

### 1. Update `projects.json`

Add a new entry in the `projects.json` file with the following properties:

- `id`: A unique identifier (e.g., "02").
- `name`: The folder name (e.g., "simple-calculator").
- `title`: The display name (e.g., "Simple Calculator").
- `startCodePen`: The CodePen link for the start version.
- `finalCodePen`: The CodePen link for the final version.
    

Example:
```json

{
  "projects": [
        {
            "id": "01",
            "name": "todo-list",
            "title": "Todo List",
            "startCodePen": "https://codepen.io/raoabid/pen/bGXOYJa",
            "finalCodePen": "https://codepen.io/raoabid/pen/QWezQbL"
        },
        {
            "id": "02",
            "name": "simple-calculator",
            "title": "Simple Calculator",
            "startCodePen": "https://codepen.io/your_start_codepen",
            "finalCodePen": "https://codepen.io/your_final_codepen"
      }
  ]
}
```

### 2. Run the Generation Script
This will create the new project directories (if they don't already exist) and generate/update the corresponding `index.html`, `styles.css`, and `script.js` files.

```bash
   npm run generate
```

### 3. Populate Project Files

   Update the files in ``/start/{project}` and `/final/{project}` with your project's content. The placeholders will be available for you to modify as needed.

## Deployment

To deploy your platform on GitHub Pages:

### 1. Push Your Changes to GitHub
```bash
   git add .
   git commit -m "Update project with new index generation and responsive table"
   git push origin main
```

### 2. Enable GitHub Pages

   • Go to your repository on GitHub.
   • Navigate to Settings > Pages.
   • Under Source, select the branch (e.g., main) and set the folder to / (root).
   • Save and wait for GitHub Pages to deploy your site.

Your site will be available at:
`https://yourusername.github.io/js-training-platform/`

## Troubleshooting

### Global CSS/JS Not Loading:
Ensure that all asset paths in your EJS templates are relative paths. For example, in your root `index.html`, use:
```html
  <link rel="stylesheet" href="css/global.css">
  <script src="js/global.js"></script>
  
```
In the project templates, adjust paths based on the directory depth (e.g., `../../css/global.css`).

### Index Files Overwritten:
The generation script creates files only if they do not already exist. If you need to update an index file, delete it manually or use a force flag (if implemented) before running the script.

### Responsive Table Issues:
Resize your browser or use developer tools to see the responsive design in action.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
