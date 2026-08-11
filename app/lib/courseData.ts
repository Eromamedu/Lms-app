export interface Lesson {
    id:number;
  title: string;
 description?: string;
  url: string;
 videoUrl: string;
  duration?: string;

}

export interface CourseData {
      id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  image: string;
  lessons: Lesson[];
  progress: number;
  students: number;
}

export const courseData: CourseData[] = [
  {
    id: "232d3004-4482-4793-ac2a-dd4d363ee03e" ,
    slug: "react-masterclass" ,
    title: "Complete React Masterclass" ,
    instructor: "John Smilga" ,
    duration: "18 Hours" ,
    image: "/courses/nextjs.jpg",
    description:
      "Master React from beginner to advanced by building real-world applications.",
      students: 4200,
    progress: 32,
    lessons: [
      {
        id: 1,
        title: "Introduction to React",
        url: "https://react.dev/learn",
        videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk"

      },
      {
        id: 2,
        title: "JSX Fundamentals",
        url: "https://react.dev/learn/writing-markup-with-jsx",
        videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 3,
        title: "Components",
        url: "https://react.dev/learn/your-first-component",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 4,
        title: "Props",
        url: "https://react.dev/learn/passing-props-to-a-component",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 5,
        title: "State",
        url: "https://react.dev/learn/state-a-components-memory",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 6,
        title: "Effects",
        url: "https://react.dev/reference/react/useEffect",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 7,
        title: "Deployment",
        url: "https://nextjs.org/docs/app/building-your-application/deploying",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
    ],
  },

  {
    id: "fe11e95a-6e6f-4ffc-83d2-71aecb60c884",
    slug: "nextjs",
    title: "Next.js Full Stack Development",
    instructor: "Vercel",
    duration: "20 Hours",
    students: 4200,
    progress: 32,
    image: "/courses/nextjs.jpg",
    description:
      "Build full-stack applications using the App Router and Server Components.",

    lessons: [
      { id: 1, title: "App Router", url: "https://nextjs.org/docs/app" ,  videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
      {
        id: 2,
        title: "Layouts",
        url: "https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates",
        videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 3,
        title: "Server Components",
        url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
        videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 4,
        title: "Client Components",
        url: "https://nextjs.org/docs/app/building-your-application/rendering/client-components",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 5,
        title: "Data Fetching",
        url: "https://nextjs.org/docs/app/building-your-application/data-fetching",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 6,
        title: "Authentication",
        url: "https://supabase.com/docs/guides/auth",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
      {
        id: 7,
        title: "Deployment",
        url: "https://vercel.com/docs",
          videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"

      },
    ],
  },

  {
    id: "0912d439-dcc0-4d6b-b685-881176a27b19",
    slug: "typescript",
    students: 4200,
    progress: 32,
    title: "TypeScript Bootcamp",
    instructor: "Maximilian Schwarzmüller",
    duration: "12 Hours",
    image: "/courses/typescrip.jpg",
    description:
      "Learn TypeScript to build scalable and maintainable applications.",

    lessons: [
      { id: 1, title: "Introduction", url: "https://www.typescriptlang.org/docs/",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 2, title: "Basic Types", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",  videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 3, title: "Functions", url: "https://www.typescriptlang.org/docs/handbook/2/functions.html",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 4, title: "Interfaces", url: "https://www.typescriptlang.org/docs/handbook/2/objects.html" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 5, title: "Generics", url: "https://www.typescriptlang.org/docs/handbook/2/generics.html"  ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
      { id: 6, title: "Modules", url: "https://www.typescriptlang.org/docs/handbook/modules/introduction.html",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 7, title: "Best Practices", url: "https://www.typescriptlang.org/docs/" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
    ],
  },

  {
    // id: "38610e8a-e3da-4210-ae2e-8f6b09f0afb0",
    id: "9f01dcbb-1748-4a75-b762-bf0606a780fa",
    slug: "node-express",
    students: 4200,
    progress: 32,
    title: "Node.js & Express API",
    instructor: "Andrew Mead",
    duration: "16 Hours",
    image: "/courses/node.jpg",
    description:
      "Build secure REST APIs using Node.js and Express.",

    lessons: [
      { id: 1, title: "Node.js Basics", url: "https://nodejs.org/en/learn",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 2, title: "Express", url: "https://expressjs.com/",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 3, title: "Routing", url: "https://expressjs.com/en/guide/routing.html" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
      { id: 4, title: "Middleware", url: "https://expressjs.com/en/guide/using-middleware.html" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
      { id: 5, title: "JWT Authentication", url: "https://jwt.io/introduction",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 6, title: "REST APIs", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 7, title: "Deployment", url: "https://render.com/docs" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
    ],
  },

  {
    // id: "372c5f6c-3875-44d8-aa3a-3cc1b3483910",
    id: "33a8e10a-a29a-4d16-8ae5-c573dfb7239d",
    slug: "tailwind-css",
    students: 4200,
    progress: 32,
    title: "Tailwind CSS Masterclass",
    instructor: "Tailwind Labs",
    duration: "10 Hours",
    image: "/courses/tailwind.jpg",
    description:
      "Create beautiful responsive interfaces using Tailwind CSS.",

    lessons: [
      { id: 1, title: "Getting Started", url: "https://tailwindcss.com/docs",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 2, title: "Utility Classes", url: "https://tailwindcss.com/docs/utility-first",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 3, title: "Flexbox", url: "https://tailwindcss.com/docs/flex" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
      { id: 4, title: "Grid", url: "https://tailwindcss.com/docs/grid-template-columns",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 5, title: "Dark Mode", url: "https://tailwindcss.com/docs/dark-mode",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 6, title: "Responsive Design", url: "https://tailwindcss.com/docs/responsive-design",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 7, title: "Optimization", url: "https://tailwindcss.com/docs/optimizing-for-production",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
    ],
  },

  {
    id: "11be4823-da88-4a70-9188-dcc844b872aa",
    students: 4200,
    progress: 32,
    slug: "git-github",
    title: "Git & GitHub Professional",
    instructor: "GitHub",
    duration: "8 Hours",
    image: "/courses/git.jpg",
    description:
      "Learn professional Git workflows and collaboration using GitHub.",

    lessons: [
      { id: 1, title: "Git Basics", url: "https://docs.github.com/en/get-started",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 2, title: "Repositories", url: "https://docs.github.com/en/repositories",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 3, title: "Branches", url: "https://docs.github.com/en/get-started/quickstart/github-flow",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 4, title: "Pull Requests", url: "https://docs.github.com/en/pull-requests" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
      { id: 5, title: "Merge Conflicts", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts",   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
 },
      { id: 6, title: "Actions", url: "https://docs.github.com/en/actions" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
      { id: 7, title: "Deployments", url: "https://docs.github.com/en/actions/deployment" ,   videoUrl: "https://www.youtube.com/watch?v=Y2hgEGPzTZY"
},
    ],
  },
];