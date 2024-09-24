import NavBar from "./components/NavBar/NavBar.tsx";
import Main from "./components/Main/Main.tsx";
import AppContextProvider from "./providers/AppContextProvider.tsx";

function App() {
    return (
        <AppContextProvider>
            <div className="flex flex-row min-w-[100vw] min-h-[100vh]  max-w-[100vw] max-h-[100vh]">
                <NavBar />
                <Main />
            </div>
        </AppContextProvider>
    );
}

export default App;
