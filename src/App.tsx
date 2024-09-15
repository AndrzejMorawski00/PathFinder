import NavBar from "./components/NavBar/NavBar.tsx";
import Main from "./components/Main/Main.tsx";
import AppContextProvider from "./providers/AppContextProvider.tsx";

function App() {
    return (
        <AppContextProvider>
            <div className="flex flex-row min-h-screen w-[100vw]">
                <NavBar />
                <Main />
            </div>
        </AppContextProvider>
    );
}

export default App;
