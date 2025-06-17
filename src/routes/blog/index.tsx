// import { createFileRoute } from "@tanstack/react-router";

// import MainBlog from "../../components/blog/MainBlog";
// import AllBlogs from "../../components/blog/AllBlogs";
// import MonthBlog from "../../components/blog/MonthBlog";
// import MainWrapper from "../../components/MainWrapper";
// import Profile from "../../components/blog/Profile";
// export const Route = createFileRoute("/blog/")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   return <Blog />;
// }

// function Blog() {
//   return (
//     <div className="mt-[80px] p-2 bg-[#0E0C15]">
//       <MainWrapper>
//         <Profile />
//         <MonthBlog />
//         <MainBlog />
//         <AllBlogs />
//       </MainWrapper>
//     </div>
//   );
// }

// src/routes/blog/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import MainBlog from "../../components/blog/MainBlog";

export const Route = createFileRoute("/blog/")({
  component: () => <MainBlog />,
});

// src/routes/blog/_layout.tsx
// src/routes/blog/_layout.tsx
// import { Outlet, Link, createFileRoute } from "@tanstack/react-router";

// const links = [
//   { to: "/blog/profile", label: "Profile" },
//   { to: "/blog/month", label: "Month Blog" },
//   { to: "/blog/main", label: "Main Blog" },
//   { to: "/blog/all", label: "All Blogs" },
// ];

// export const Route = createFileRoute("/blog/")({
//   component: BlogLayout,
// });

// function BlogLayout() {
//   return (
//     <div className="mt-[80px] p-2 bg-[#0E0C15] min-h-screen flex">
//       <aside className="w-64 p-4 bg-[#AD46FF] text-black min-h-screen">
//         <ul className="space-y-2">
//           {links.map((link) => (
//             <li key={link.to}>
//               <Link
//                 to={link.to}
//                 className="block px-4 py-2 rounded hover:bg-white/20"
//                 activeProps={{
//                   className: "bg-white text-black font-bold",
//                 }}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </aside>
//       {/* <main className="flex-1 p-6 text-white">
//         <Outlet />
//       </main> */}
//     </div>
//   );
// }

// export default BlogLayout;
