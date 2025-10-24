// // app/explore-course/[slug]/metadata.ts

// import { Metadata } from 'next';
// // ⚠️ You will need to import your data fetching functions directly here.
// // These imports are placeholders and assume your API layer is available
// // and can be called directly in a server component context (e.g., a fetch call).
// // If your current hooks rely *only* on client-side state/context (like a Redux store),
// // you may need to refactor the data access layer for server-side usage.

// // Placeholder Types - replace with your actual types
// interface OpeningProgram {
//   slug: string;
//   programName: string;
//   posterUrl: string;
//   // ... other fields
// }

// interface MasterProgram {
//   title: string;
//   description: string;
//   // ... other fields
// }

// // ⚠️ ASSUMPTION: You have server-side functions to fetch the data.
// // Replace these with your actual server-side data fetching logic (e.g., direct API calls or ORM queries).
// async function getAllOpeningProgramsServer(): Promise<OpeningProgram[]> {
//   // Example: Direct fetch call
//   // const res = await fetch(`${process.env.API_URL}/opening-programs`);
//   // return res.json();
//   return []; // Placeholder
// }

// async function getMasterProgramByTitleServer(title: string): Promise<MasterProgram | null> {
//   // Example: Direct fetch call
//   // const res = await fetch(`${process.env.API_URL}/master-program?title=${title}`);
//   // return res.json();
//   return null; // Placeholder
// }

// type ProgramDetailProps = {
//   params: { slug: string };
// };

// export async function generateMetadata(
//   { params }: ProgramDetailProps,
// ): Promise<Metadata> {
//   const openingProgramSlug = params.slug;

//   // 1. Fetch all opening programs
//   const allPrograms = await getAllOpeningProgramsServer();
//   const openingProgram = allPrograms.find(op => op.slug === openingProgramSlug);

//   if (!openingProgram) {
//     // Fallback metadata if program not found
//     return {
//       title: 'Program Not Found',
//       description: 'The requested program could not be found.',
//     };
//   }

//   // 2. Fetch master program data
//   const masterProgram = await getMasterProgramByTitleServer(openingProgram.programName);

//   const metaTitle = masterProgram?.title || "Program Detail";
//   const metaDescription = masterProgram?.description || "Explore program details";
//   const metaImage = openingProgram.posterUrl
//     ? openingProgram.posterUrl.startsWith("http")
//       ? openingProgram.posterUrl
//       : `${process.env.NEXT_PUBLIC_BASE_URL}${openingProgram.posterUrl}`
//     : `${process.env.NEXT_PUBLIC_BASE_URL}/default-poster.png`;

//   return {
//     title: metaTitle,
//     description: metaDescription,
//     openGraph: {
//       title: metaTitle,
//       description: metaDescription,
//       url: `${process.env.NEXT_PUBLIC_BASE_URL}/explore-course/${openingProgramSlug}`,
//       images: [
//         {
//           url: metaImage,
//           alt: metaTitle,
//         },
//       ],
//       type: 'website',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: metaTitle,
//       description: metaDescription,
//       images: [metaImage],
//     },
//   };
// }