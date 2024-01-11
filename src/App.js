import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import NavBar from './components/NavBar';
import Teams from './pages/Teams/Teams';
import Leagues from './pages/LeagueInside/Leagues';
import LeaguePointTable from './pages/LeagueInside/LeaguePointTable';
import LeagueMatches from './pages/LeagueInside/LeagueMatches';
import LeagueCompletedMatches from './pages/LeagueInside/LeagueCompletedMatches';
import MatchEdit from './pages/LeagueInside/MatchEdit';
import PanelNav from './pages/Panel/PanelNav';
import AddTeam from './pages/Panel/Team/AddTeam';
import AddLeagues from './pages/Panel/Leagues/AddLeagues';
import AllLeagues from './pages/RunningLeagues/AllLeagues';
import LeagueTeams from './pages/LeagueInside/LeagueTeams';
import AddLeagueTeams from './pages/LeagueInside/AddLeagueTeams/AddLeagueTeams';
import AddLeagueMatch from './pages/LeagueInside/AddLeagueMatch/AddLeagueMatch';
import PendingLeagues from './pages/RunningLeagues/PendingLeagues';
import StartLeague from './pages/LeagueInside/StartLeague';
import TeamInside from './pages/Teams/TeamInside/TeamInside';
import TeamMatches from './pages/Teams/TeamInside/TeamMatches';
import TeamStat from './pages/Teams/TeamInside/TeamStat';
import EditTeam from './pages/Panel/Team/EditTeam';
import Players from './pages/Players/Players';
import AddPlayers from './pages/Panel/Players/AddPlayers';
import TeamPlayers from './pages/Teams/TeamInside/TeamPlayers';
import AddTeamPlayer from './pages/Teams/TeamInside/AddTeamPlayer';
import EditPlayers from './pages/Panel/Players/EditPlayers';
import TeamTrophies from './pages/Teams/TeamInside/TeamTrophies';
import useAuthHooks from './Hooks/useAuthHooks';
import PrivateRoute from './Hooks/PrivateRoute';

function App() {
  const authChecked = useAuthHooks();
  return !authChecked ? (
    <div>Checking...</div>
  ) : (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          {/* Teams  */}
          <Route
            exact
            path="/teams"
            element={
              <PrivateRoute>
                <Teams />
              </PrivateRoute>
            }
          />

          {/* Leagues  */}
          <Route
            exact
            path="/allLeagues"
            element={
              <PrivateRoute>
                <AllLeagues />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/pendingLeagues"
            element={
              <PrivateRoute>
                <PendingLeagues />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/leagues/:leagueId"
            element={
              <PrivateRoute>
                <Leagues />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/leagueTeams/:leagueId"
            element={
              <PrivateRoute>
                <LeagueTeams />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/addLeagueTeams/:leagueId"
            element={
              <PrivateRoute>
                <AddLeagueTeams />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/leaguePointsTable/:leagueId"
            element={
              <PrivateRoute>
                <LeaguePointTable />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/leagueMatches/:leagueId"
            element={
              <PrivateRoute>
                <LeagueMatches />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/addLeagueMatch/:leagueId"
            element={
              <PrivateRoute>
                <AddLeagueMatch />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/leagueCompletedMatches/:leagueId"
            element={
              <PrivateRoute>
                <LeagueCompletedMatches />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/startLeague/:leagueId"
            element={
              <PrivateRoute>
                <StartLeague />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/editMatches/:matchId/:leagueId"
            element={
              <PrivateRoute>
                <MatchEdit />
              </PrivateRoute>
            }
          />

          {/* Panel */}
          <Route
            exact
            path="/managerPanel"
            element={
              <PrivateRoute>
                <PanelNav />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/addTeam"
            element={
              <PrivateRoute>
                <AddTeam />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/addLeagues"
            element={
              <PrivateRoute>
                <AddLeagues />
              </PrivateRoute>
            }
          />

          {/* Teams Inside  */}
          <Route
            exact
            path="/editTeam/:teamId"
            element={
              <PrivateRoute>
                <EditTeam />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/viewTeam/:teamId"
            element={
              <PrivateRoute>
                <TeamInside />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/teamMatches/:teamId"
            element={
              <PrivateRoute>
                <TeamMatches />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/teamStat/:teamId"
            element={
              <PrivateRoute>
                <TeamStat />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/teamPlayers/:teamId"
            element={
              <PrivateRoute>
                <TeamPlayers />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/addTeamPlayers/:teamId"
            element={
              <PrivateRoute>
                <AddTeamPlayer />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/teamTrophies/:teamId"
            element={
              <PrivateRoute>
                <TeamTrophies />
              </PrivateRoute>
            }
          />

          {/* Players */}
          <Route
            exact
            path="/players"
            element={
              <PrivateRoute>
                <Players />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/addPlayers"
            element={
              <PrivateRoute>
                <AddPlayers />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/editPlayers/:playerId"
            element={
              <PrivateRoute>
                <EditPlayers />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
