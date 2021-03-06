import React from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar } from '@material-ui/core';

import { Button, useMenu, Menu } from 'ui';

import { Palette } from 'styles';

import { Guard } from 'core/auth';

import Notifications from './notifications';
import UserDetails from './user-details';

import csx from './UserSection.scss';

const paperProps = {
  style: {
    transform: 'translateX(5%) translateY(3%)',
  },
};

const UserSection = () => {
  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu();

  return (
    <div className={csx.userSection}>
      <Guard.Protected>
        {({ user: { username } }) => (
          <>
            <div className={csx.details} onClick={openMenu}>
              <Avatar className={csx.avatar}>{username.charAt(0).toUpperCase()}</Avatar>
              <span>Hi, {username}</span>
            </div>

            {menuOpen && (
              <Menu
                anchorEl={anchorEl}
                background={Palette.secondary}
                keepMounted={false}
                width={326}
                onClose={closeMenu}
                PaperProps={paperProps}
              >
                <UserDetails />
              </Menu>
            )}

            <div className={csx.divider} />

            <Notifications />
          </>
        )}
      </Guard.Protected>

      <Guard.Unprotected>
        <>
          <NavLink to="/login">
            <Button className={csx.logInBtn}>LOG IN</Button>
          </NavLink>

          <NavLink to="/register">
            <Button>CREATE ACCOUNT</Button>
          </NavLink>
        </>
      </Guard.Unprotected>
    </div>
  );
};

export default UserSection;
