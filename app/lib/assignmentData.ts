export interface AssignmentSeed {
  lessonTitle: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}

export const assignmentData: AssignmentSeed[] = [

{
lessonTitle:"Introduction to React",
question:"What is React primarily used for?",
option_a:"Building user interfaces",
option_b:"Database management",
option_c:"Operating systems",
option_d:"Networking",
correct_answer:"A"
},

{
lessonTitle:"Introduction to React",
question:"Who created React?",
option_a:"Google",
option_b:"Meta",
option_c:"Microsoft",
option_d:"Amazon",
correct_answer:"B"
},

{
lessonTitle:"JSX Fundamentals",
question:"JSX allows developers to write ____.",
option_a:"HTML inside JavaScript",
option_b:"Python",
option_c:"SQL",
option_d:"Java",
correct_answer:"A"
},

{
lessonTitle:"JSX Fundamentals",
question:"JSX is converted into ____.",
option_a:"CSS",
option_b:"React Elements",
option_c:"PHP",
option_d:"JSON",
correct_answer:"B"
},

{
lessonTitle:"Components",
question:"A React component is ____.",
option_a:"Reusable UI",
option_b:"Database",
option_c:"Folder",
option_d:"Server",
correct_answer:"A"
},

{
lessonTitle:"Components",
question:"React components usually return ____.",
option_a:"HTML",
option_b:"JSX",
option_c:"SQL",
option_d:"JSON",
correct_answer:"B"
},



{
lessonTitle:"Props",
question:" What are props used for in React?",
option_a:"Passing data to components",
option_b:"Styling components",
option_c:"Connecting databases",
option_d:"Creating folders",
correct_answer:"A"
},

{
lessonTitle:"Props",
question:"Props are passed from ____.",
option_a:"Child to parent",
option_b:"Parent to child",
option_c:"Database to component",
option_d:"Browser to server",
correct_answer:"B"
},

{
lessonTitle:"State",
question:"What does state store in React?",
option_a:"Component data that can change",
option_b:"CSS styles",
option_c:"Folder names",
option_d:"URLs",
correct_answer:"A"
},

{
lessonTitle:"State",
question:"Which hook is commonly used to create state?",
option_a:"useFetch",
option_b:"useState",
option_c:"useNode",
option_d:"useServer",
correct_answer:"B"
},

{
lessonTitle:"Effects",
question:"Which hook is used for side effects?",
option_a:"useState",
option_b:"useEffect",
option_c:"useMemo",
option_d:"useProps",
correct_answer:"B"
},

{
lessonTitle:"Effects",
question:"A common use of useEffect is ____.",
option_a:"Fetching data",
option_b:"Creating folders",
option_c:"Compiling TypeScript",
option_d:"Building CSS",
correct_answer:"A"
},

{
lessonTitle:"Deployment",
question:"Before deployment, a React app should be ____.",
option_a:"Built for production",
option_b:"Deleted",
option_c:"Compressed manually",
option_d:"Converted to PHP",
correct_answer:"A"
},

{
lessonTitle:"Deployment",
question:"Which platform can host a React application?",
option_a:"Vercel",
option_b:"Microsoft Word",
option_c:"Paint",
option_d:"Calculator",
correct_answer:"A"
},


//
// Next.js Course
//

{
lessonTitle:"App Router",
question:"What is the App Router in Next.js mainly used for?",
option_a:"Creating application routes",
option_b:"Connecting to a database",
option_c:"Styling components",
option_d:"Managing Git branches",
correct_answer:"A"
},

{
lessonTitle:"App Router",
question:"Which folder is used by the App Router?",
option_a:"app",
option_b:"pages",
option_c:"public",
option_d:"styles",
correct_answer:"A"
},

{
lessonTitle:"Layouts",
question:"What is the purpose of a layout in Next.js?",
option_a:"Share UI across multiple pages",
option_b:"Store images",
option_c:"Manage CSS files",
option_d:"Create API keys",
correct_answer:"A"
},

{
lessonTitle:"Layouts",
question:"Which file defines a layout in the App Router?",
option_a:"layout.tsx",
option_b:"index.tsx",
option_c:"home.tsx",
option_d:"main.tsx",
correct_answer:"A"
},

{
lessonTitle:"Server Components",
question:"Where do Server Components run?",
option_a:"On the server",
option_b:"In the browser",
option_c:"Inside CSS",
option_d:"Inside the database",
correct_answer:"A"
},

{
lessonTitle:"Server Components",
question:"What is one benefit of Server Components?",
option_a:"Reduced JavaScript sent to the browser",
option_b:"Faster CSS animations",
option_c:"Automatic Git commits",
option_d:"Built-in SQL support",
correct_answer:"A"
},

{
lessonTitle:"Client Components",
question:"Which directive makes a component a Client Component?",
option_a:"'use client'",
option_b:"'use server'",
option_c:"'use next'",
option_d:"'client mode'",
correct_answer:"A"
},

{
lessonTitle:"Client Components",
question:"Which React hook requires a Client Component?",
option_a:"useState",
option_b:"fetch",
option_c:"headers",
option_d:"cookies",
correct_answer:"A"
},

{
lessonTitle:"Data Fetching",
question:"Which function is commonly used to fetch data in Next.js?",
option_a:"fetch()",
option_b:"print()",
option_c:"compile()",
option_d:"render()",
correct_answer:"A"
},

{
lessonTitle:"Data Fetching",
question:"Server Components can fetch data ____.",
option_a:"Directly on the server",
option_b:"Only with jQuery",
option_c:"Only after deployment",
option_d:"Only from localStorage",
correct_answer:"A"
},

{
lessonTitle:"Authentication",
question:"Which service are we using in this LMS for authentication?",
option_a:"Supabase",
option_b:"Firebase",
option_c:"MongoDB",
option_d:"Express",
correct_answer:"A"
},

{
lessonTitle:"Authentication",
question:"Authentication allows users to ____.",
option_a:"Sign in securely",
option_b:"Create CSS files",
option_c:"Compile TypeScript",
option_d:"Manage Git branches",
correct_answer:"A"
},

{
lessonTitle:"Deployment",
question:"Which platform is commonly used to deploy Next.js applications?",
option_a:"Vercel",
option_b:"Excel",
option_c:"Photoshop",
option_d:"PowerPoint",
correct_answer:"A"
},

{
lessonTitle:"Deployment",
question:"Before deploying a Next.js project, you should ____.",
option_a:"Ensure the project builds successfully",
option_b:"Delete the app folder",
option_c:"Remove package.json",
option_d:"Disable routing",
correct_answer:"A"
},

//
// TypeScript Course
//

{
lessonTitle:"Introduction",
question:"What is TypeScript?",
option_a:"A superset of JavaScript",
option_b:"A database",
option_c:"A CSS framework",
option_d:"A web browser",
correct_answer:"A"
},

{
lessonTitle:"Introduction",
question:"TypeScript code is compiled into ____.",
option_a:"JavaScript",
option_b:"Python",
option_c:"Java",
option_d:"PHP",
correct_answer:"A"
},

{
lessonTitle:"Basic Types",
question:"Which of these is a TypeScript basic type?",
option_a:"string",
option_b:"folder",
option_c:"button",
option_d:"server",
correct_answer:"A"
},

{
lessonTitle:"Basic Types",
question:"Which keyword declares a boolean variable?",
option_a:"boolean",
option_b:"boolValue",
option_c:"trueType",
option_d:"logic",
correct_answer:"A"
},

{
lessonTitle:"Functions",
question:"TypeScript allows functions to specify ____.",
option_a:"Return types",
option_b:"Folder colors",
option_c:"Database names",
option_d:"Image sizes",
correct_answer:"A"
},

{
lessonTitle:"Functions",
question:"Which symbol specifies a function return type?",
option_a:":",
option_b:";",
option_c:"#",
option_d:"@",
correct_answer:"A"
},

{
lessonTitle:"Interfaces",
question:"What is an interface mainly used for?",
option_a:"Defining the shape of an object",
option_b:"Creating HTML pages",
option_c:"Styling components",
option_d:"Running SQL queries",
correct_answer:"A"
},

{
lessonTitle:"Interfaces",
question:"Interfaces improve ____.",
option_a:"Type safety",
option_b:"Internet speed",
option_c:"Image quality",
option_d:"File size",
correct_answer:"A"
},

{
lessonTitle:"Generics",
question:"What is the purpose of generics?",
option_a:"Creating reusable code for different types",
option_b:"Creating CSS animations",
option_c:"Deploying applications",
option_d:"Connecting databases",
correct_answer:"A"
},

{
lessonTitle:"Generics",
question:"Which syntax commonly represents a generic type?",
option_a:"<T>",
option_b:"{T}",
option_c:"(T)",
option_d:"[T]",
correct_answer:"A"
},

{
lessonTitle:"Modules",
question:"Which keyword exports code from a module?",
option_a:"export",
option_b:"public",
option_c:"share",
option_d:"global",
correct_answer:"A"
},

{
lessonTitle:"Modules",
question:"Which keyword imports code into a file?",
option_a:"import",
option_b:"include",
option_c:"using",
option_d:"requireFile",
correct_answer:"A"
},

{
lessonTitle:"Best Practices",
question:"Which is considered a TypeScript best practice?",
option_a:"Use meaningful type definitions",
option_b:"Use the 'any' type everywhere",
option_c:"Avoid interfaces",
option_d:"Remove all type annotations",
correct_answer:"A"
},

{
lessonTitle:"Best Practices",
question:"Why should excessive use of 'any' be avoided?",
option_a:"It removes many TypeScript safety checks",
option_b:"It slows the browser",
option_c:"It deletes files",
option_d:"It breaks HTML",
correct_answer:"A"
},

//
// Tailwind CSS Course
//

{
lessonTitle:"Getting Started",
question:"What is Tailwind CSS?",
option_a:"A utility-first CSS framework",
option_b:"A JavaScript framework",
option_c:"A database",
option_d:"A backend language",
correct_answer:"A"
},

{
lessonTitle:"Getting Started",
question:"Tailwind CSS is mainly used for ____.",
option_a:"Styling web applications",
option_b:"Managing databases",
option_c:"Writing APIs",
option_d:"Creating Git repositories",
correct_answer:"A"
},

{
lessonTitle:"Utility Classes",
question:"What are Tailwind utility classes?",
option_a:"Small classes that apply a single style",
option_b:"JavaScript functions",
option_c:"Database queries",
option_d:"API endpoints",
correct_answer:"A"
},

{
lessonTitle:"Utility Classes",
question:"Which class adds padding in Tailwind?",
option_a:"p-4",
option_b:"m-4",
option_c:"text-lg",
option_d:"bg-blue-500",
correct_answer:"A"
},

{
lessonTitle:"Flexbox",
question:"Which Tailwind class enables Flexbox?",
option_a:"flex",
option_b:"grid",
option_c:"inline",
option_d:"block",
correct_answer:"A"
},

{
lessonTitle:"Flexbox",
question:"Which class centers items vertically in a flex container?",
option_a:"items-center",
option_b:"justify-center",
option_c:"text-center",
option_d:"mx-auto",
correct_answer:"A"
},

{
lessonTitle:"Grid",
question:"Which class creates a grid container?",
option_a:"grid",
option_b:"flex",
option_c:"table",
option_d:"inline-grid",
correct_answer:"A"
},

{
lessonTitle:"Grid",
question:"Which class creates three grid columns?",
option_a:"grid-cols-3",
option_b:"cols-3",
option_c:"grid-3",
option_d:"column-3",
correct_answer:"A"
},

{
lessonTitle:"Dark Mode",
question:"Which variant applies styles in dark mode?",
option_a:"dark:",
option_b:"night:",
option_c:"theme:",
option_d:"mode:",
correct_answer:"A"
},

{
lessonTitle:"Dark Mode",
question:"Dark mode improves ____.",
option_a:"User experience in low-light environments",
option_b:"Database performance",
option_c:"Internet speed",
option_d:"Git commits",
correct_answer:"A"
},

{
lessonTitle:"Responsive Design",
question:"Which prefix targets medium screens in Tailwind?",
option_a:"md:",
option_b:"mobile:",
option_c:"medium:",
option_d:"m:",
correct_answer:"A"
},

{
lessonTitle:"Responsive Design",
question:"Responsive design helps websites ____.",
option_a:"Adapt to different screen sizes",
option_b:"Run SQL queries",
option_c:"Compile TypeScript",
option_d:"Store user data",
correct_answer:"A"
},

{
lessonTitle:"Optimization",
question:"Why optimize a Tailwind project before deployment?",
option_a:"To reduce CSS file size",
option_b:"To increase image resolution",
option_c:"To create databases",
option_d:"To improve Git history",
correct_answer:"A"
},

{
lessonTitle:"Optimization",
question:"Optimization mainly improves ____.",
option_a:"Website performance",
option_b:"Folder names",
option_c:"Database tables",
option_d:"Browser tabs",
correct_answer:"A"
},
//
// Git & GitHub Course
//

{
lessonTitle:"Git Basics",
question:"What is Git primarily used for?",
option_a:"Version control",
option_b:"Creating databases",
option_c:"Writing CSS",
option_d:"Hosting websites",
correct_answer:"A"
},

{
lessonTitle:"Git Basics",
question:"Which command initializes a Git repository?",
option_a:"git init",
option_b:"git start",
option_c:"git create",
option_d:"git new",
correct_answer:"A"
},

{
lessonTitle:"Repositories",
question:"A repository is ____.",
option_a:"A project storage location",
option_b:"A CSS framework",
option_c:"A JavaScript library",
option_d:"A database table",
correct_answer:"A"
},

{
lessonTitle:"Repositories",
question:"GitHub repositories can be ____.",
option_a:"Public or Private",
option_b:"Only Public",
option_c:"Only Private",
option_d:"Offline only",
correct_answer:"A"
},

{
lessonTitle:"Branches",
question:"Why are branches used in Git?",
option_a:"To develop features without affecting the main code",
option_b:"To increase internet speed",
option_c:"To deploy applications",
option_d:"To write CSS",
correct_answer:"A"
},

{
lessonTitle:"Branches",
question:"Which command creates a new branch?",
option_a:"git branch feature-name",
option_b:"git new feature-name",
option_c:"git create branch",
option_d:"git checkout main",
correct_answer:"A"
},

{
lessonTitle:"Pull Requests",
question:"What is a Pull Request used for?",
option_a:"Requesting code review before merging",
option_b:"Deleting repositories",
option_c:"Downloading files",
option_d:"Creating databases",
correct_answer:"A"
},

{
lessonTitle:"Pull Requests",
question:"Pull Requests are commonly used for ____.",
option_a:"Team collaboration",
option_b:"CSS styling",
option_c:"Creating APIs",
option_d:"Running SQL queries",
correct_answer:"A"
},

{
lessonTitle:"Merge Conflicts",
question:"When do merge conflicts occur?",
option_a:"When two changes cannot be merged automatically",
option_b:"When creating a repository",
option_c:"When deleting a branch",
option_d:"When pushing images",
correct_answer:"A"
},

{
lessonTitle:"Merge Conflicts",
question:"Merge conflicts must be ____.",
option_a:"Resolved manually",
option_b:"Ignored",
option_c:"Deleted",
option_d:"Compiled",
correct_answer:"A"
},

{
lessonTitle:"Actions",
question:"GitHub Actions are mainly used for ____.",
option_a:"Automation and CI/CD",
option_b:"Creating databases",
option_c:"Styling websites",
option_d:"Writing React components",
correct_answer:"A"
},

{
lessonTitle:"Actions",
question:"GitHub Actions can automatically ____.",
option_a:"Run tests and deploy code",
option_b:"Create HTML files",
option_c:"Write CSS",
option_d:"Generate images",
correct_answer:"A"
},

{
lessonTitle:"Deployments",
question:"Deployment means ____.",
option_a:"Publishing an application for users",
option_b:"Deleting a project",
option_c:"Creating folders",
option_d:"Installing Node.js",
correct_answer:"A"
},

{
lessonTitle:"Deployments",
question:"GitHub integrates well with which deployment platform?",
option_a:"Vercel",
option_b:"Microsoft Paint",
option_c:"Notepad",
option_d:"Windows Explorer",
correct_answer:"A"
},
//
// Node.js Course
//

{
lessonTitle:"Node.js Basics",
question:"What is Node.js primarily used for?",
option_a:"Running JavaScript on the server",
option_b:"Styling web pages",
option_c:"Creating databases",
option_d:"Editing images",
correct_answer:"A"
},

{
lessonTitle:"Node.js Basics",
question:"Node.js is built on which JavaScript engine?",
option_a:"V8",
option_b:"SpiderMonkey",
option_c:"Chakra",
option_d:"Java VM",
correct_answer:"A"
},

{
lessonTitle:"Express",
question:"What is Express?",
option_a:"A web framework for Node.js",
option_b:"A CSS framework",
option_c:"A database",
option_d:"A React hook",
correct_answer:"A"
},

{
lessonTitle:"Express",
question:"Which command installs Express?",
option_a:"npm install express",
option_b:"npm express",
option_c:"node install express",
option_d:"install express",
correct_answer:"A"
},

{
lessonTitle:"Routing",
question:"What is routing used for in Express?",
option_a:"Handling different URL requests",
option_b:"Connecting CSS files",
option_c:"Creating databases",
option_d:"Compiling JavaScript",
correct_answer:"A"
},

{
lessonTitle:"Routing",
question:"Which method creates a GET route?",
option_a:"app.get()",
option_b:"app.post()",
option_c:"app.use()",
option_d:"app.listen()",
correct_answer:"A"
},

{
lessonTitle:"Middleware",
question:"What is middleware in Express?",
option_a:"Functions that run between request and response",
option_b:"A database engine",
option_c:"A CSS preprocessor",
option_d:"A React component",
correct_answer:"A"
},

{
lessonTitle:"Middleware",
question:"Which Express function registers middleware?",
option_a:"app.use()",
option_b:"app.route()",
option_c:"app.get()",
option_d:"app.listen()",
correct_answer:"A"
},

{
lessonTitle:"JWT Authentication",
question:"What does JWT stand for?",
option_a:"JSON Web Token",
option_b:"Java Web Template",
option_c:"JavaScript Web Tool",
option_d:"JSON Website Tracker",
correct_answer:"A"
},

{
lessonTitle:"JWT Authentication",
question:"JWT is mainly used for ____.",
option_a:"User authentication",
option_b:"Styling web pages",
option_c:"Creating databases",
option_d:"Compressing images",
correct_answer:"A"
},

{
lessonTitle:"REST APIs",
question:"What does REST stand for?",
option_a:"Representational State Transfer",
option_b:"Remote Server Technology",
option_c:"Rapid Server Template",
option_d:"Resource Storage Tool",
correct_answer:"A"
},

{
lessonTitle:"REST APIs",
question:"Which HTTP method is commonly used to retrieve data?",
option_a:"GET",
option_b:"POST",
option_c:"DELETE",
option_d:"PUT",
correct_answer:"A"
},

{
lessonTitle:"Deployment",
question:"What does deployment mean?",
option_a:"Making an application available for users",
option_b:"Deleting a project",
option_c:"Installing Node.js",
option_d:"Writing JavaScript",
correct_answer:"A"
},

{
lessonTitle:"Deployment",
question:"Which platform can be used to deploy a Node.js application?",
option_a:"Render",
option_b:"Microsoft Word",
option_c:"Excel",
option_d:"Paint",
correct_answer:"A"
},
];





