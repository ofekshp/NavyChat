import init from "./App";

const PORT = process.env.PORT;

init().then((app) => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
  });
