export const PrivateRoute = ({
    loggedIn, component: Component, ...rest
  }) => (
    <Route
      {...rest}
      render={props => (
      loggedIn ?
        <Component {...props} />
        :
        <Redirect to="/" />)}
    />
  );
  
  PrivateRoute.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
  };