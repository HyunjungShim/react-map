export default function ErrorComonent({ apiError, children }) {
  // const error = apiError;
  console.error("errorMsg", apiError);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {apiError?.statusText ||
            apiError?.message ||
            apiError?.msg ||
            "Unknown error"}
        </i>
      </p>
      {children && children}
    </div>
  );
}
