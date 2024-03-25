function Logout() {
  return (
    <section className="user_logout">
      <h1>Lets get started.</h1>
      <div className="user_logout-text">
        <p>You have successfully logged out.</p>
        <p>
          Thank you for visiting CurateMe! Please come again to check out more
          artworks and add them to your favorites.
        </p>
      </div>
      <Link
        style={{
          textDecoration: "none",
          fontWeight: "800",
          color: "var(--color-primary)",
        }}
        to="/login"
      >
        {" "}
        Click here to login{" "}
      </Link>
    </section>
  );
}

export default Logout;
