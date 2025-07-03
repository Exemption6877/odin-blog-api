import styles from "./App.module.css";
import Footer from "./components/footer";
import Nav from "./components/nav";

function App() {
  return (
    <div className={styles.appWrapper}>
      <Nav />
      <main className={styles.mainContent}>
        <h1>Content here</h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
