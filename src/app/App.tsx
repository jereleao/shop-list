import React, { useRef, useState } from 'react';
import { SwipeContainer } from '../components';
import { Block, BottonDiv, UpperDiv, Wrapper } from './styled';
import { Outlet, useParams } from 'react-router-dom';
import { GlobalStyle } from '../components';
import { useSwipeListener, IEvent } from '../hooks';

export default function App() {
  const [mov, setMov] = useState({ x: 0, y: 0 });

  const onSwipeMoviment: (e: IEvent) => void = e => {
    setMov(prev => {
      const x = prev.x + e.detail.xMov;
      const y = prev.y + e.detail.yMov;
      return {
        x,
        y,
      };
    });
  };

  const block = useRef<HTMLDivElement>(null);
  useSwipeListener(block, { onSwipeMoviment });

  return (
    <>
      <GlobalStyle />
      <Outlet />
      <Wrapper>
        <SwipeContainer>
          <UpperDiv>Swipe me</UpperDiv>
        </SwipeContainer>
        <BottonDiv>
          <Block ref={block} xMov={mov.x} yMov={mov.y} />
        </BottonDiv>
      </Wrapper>
    </>
  );
}

function Invoice() {
  let { invoiceId } = useParams();
  return <h1>Invoice {invoiceId}</h1>;
}

// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams,
// } from 'react-router-dom';

// export default function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/topics">
//             <Topics />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Topics() {
//   let match = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }

// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import your route components too

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route index element={<Home />} />
//         <Route path="teams" element={<Teams />}>
//           <Route path=":teamId" element={<Team />} />
//           <Route path="new" element={<NewTeamForm />} />
//           <Route index element={<LeagueStandings />} />
//         </Route>
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );

// import { Routes, Route, Link, Outlet } from 'react-router-dom';

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route path="invoices" element={<Invoices />} />
//         <Route path="dashboard" element={<Dashboard />} />
//       </Route>
//     </Routes>
//   );
// }

// function Layout() {
//   return (
//     <div>
//       <h1>Welcome to the app!</h1>
//       <nav>
//         <Link to="invoices">Invoices</Link> |{' '}
//         <Link to="dashboard">Dashboard</Link>
//       </nav>
//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// function Invoices() {
//   return <h1>Invoices</h1>;
// }

// function Dashboard() {
//   return <h1>Dashboard</h1>;
// }
