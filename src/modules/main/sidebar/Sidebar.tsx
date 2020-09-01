import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Button } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Work';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';

import { IMGS_PATH } from 'consts';

import { SidebarProps, SidebarLink } from '.';

import csx from './Sidebar.scss';

const LINK_HEIGHT = 80;

const MARKER_HEIGHT = 30;

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, exact: true },
  { label: 'Templates', path: '/templates', icon: <TemplatesIcon /> },
  { label: 'Projects', path: '/projects', icon: <ProjectsIcon /> }
];

const getActiveLinkIdx = (pathname: string, links: SidebarLink[]) => {
  return links.findIndex(({ path, exact }) => {
    if (exact) {
      return path === pathname;
    }

    return pathname.includes(path);
  });
};

export const Sidebar = ({ basePath, isSidebarOpen, changeSidebarState }: SidebarProps) => {
  const { pathname } = useLocation();

  const activeLinkIdx = getActiveLinkIdx(pathname.replace(basePath, ''), sidebarLinks);

  return (
    <aside className={csx.sidebar}>
      <div className={csx.sidebarContent}>
        <figure className={csx.logo} >
          {isSidebarOpen 
            ? 
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <img height="30px" src={IMGS_PATH + '/Logo.png'} />
                <p style={{marginLeft:"10px"}}>Jupi.io</p>
                <p style={{marginLeft:"10px"}} onClick={()=>changeSidebarState()}><Close /></p>
              </div>


            : <Menu onClick={()=>changeSidebarState()} />}
        </figure>

        <div className={csx.links}>
          {sidebarLinks.map(({ path, label, icon, exact }) => (
            <NavLink
              key={label}
              exact={exact}
              activeClassName={csx.active}
              className={csx.link}
              style={{ height: `${LINK_HEIGHT}px` }}
              to={`${basePath}${path}`}
            >
              <Button>

                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {icon}
                    <p>{isSidebarOpen && label}</p>
                </div> 

              </Button>

            </NavLink>
          ))}
          <span
            className={csx.marker}
            style={{
              height: `${MARKER_HEIGHT}px`,
              top: `${(LINK_HEIGHT - MARKER_HEIGHT) / 2}px`,
              transform: `translateY(${LINK_HEIGHT * activeLinkIdx}px)`
            }}
          />
        </div>
      </div>
    </aside>
  );
};
