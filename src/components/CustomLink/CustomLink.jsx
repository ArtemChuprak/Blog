import React from 'react';
import { Link, useMatch } from 'react-router-dom';

function CustomLink({ children, to, ...props }) {
  const match = useMatch(to);
  const styles = match
    ? { color: '#52C41A', padding: '0 18px', border: '1px solid #52C41A', borderRadius: '5px' }
    : { color: ' rgba(0, 0, 0, 0.85)' };

  return (
    <Link to={to} {...props} style={styles}>
      {children}
    </Link>
  );
}

export default CustomLink;