import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../store/reducers/userSlice.js';
import { useRouter } from 'next/router';
import supabase from '../config/supabaseClient.js';
import { sub, unsub } from '../store/reducers/messengerSlice';
import { motion } from 'framer-motion';
import { logoutUser } from '../store/reducers/userSlice';

export default function NavBar() {
  const dispatch = useDispatch();
  const [burgerClicked, setBurgerClicked] = useState(false);
  // checks if there is a user logged in
  const session = useSelector((state) => state.user.id);

  const handleBurger = () => {
    const navLinks = document.querySelectorAll('.nav-links li');
    setBurgerClicked(!burgerClicked);

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.8
        }s`;
      }
    });
  };
  const router = useRouter();
  useEffect(() => {
    dispatch(checkSession());

    const { subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event);
        if (event == 'SIGNED_IN') {
          dispatch(checkSession(router));
        }
        if (event == 'SIGNED_OUT') {
        }
        if (event == 'USER_UPDATED') {
        }
        if (event == 'PASSWORD_RECOVERY') {
          router.push('/password-reset');
        }
      }
    );
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const messageListener = dispatch(sub());
    return () => {
      messageListener && unsub(messageListener);
    };
  }, [session]);

  return (
    <nav className="navbar">
      <div className="brand-title">
        <motion.h2
          whileHover={{
            scale: 1.3,
          }}
        >
          {session ? (
            <Link href="/user/homepage">
              <a>Optimate 🐙</a>
            </Link>
          ) : (
            <Link href="/">
              <a>Optimate 🐙</a>
            </Link>
          )}
        </motion.h2>
      </div>
      <ul className={burgerClicked ? 'nav-links nav-active' : 'nav-links'}>
        {session ? (
          // these are the links that will appear if a user is logged in
          <>
            <li>
              <Link href="/messages">
                <a>Messages</a>
              </Link>
            </li>
            <li>
              <Link href="/user/settings">
                <a>Setting</a>
              </Link>
            </li>
            <li>
              <a href="/" onClick={() => dispatch(logoutUser(Router))}>
                <>Signout</>
              </a>
            </li>
          </>
        ) : (
          // these are the links that will appear if a user is not logged in
          <>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            </li>
          </>
        )}
      </ul>

      <div
        onClick={handleBurger}
        className={burgerClicked ? 'burger burger-toggle' : 'burger'}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
