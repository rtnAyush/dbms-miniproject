import { useEffect, useState } from "react";

const styles = {
    width: '100px',
    height: '50px',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate(50%,50%)'
}

export default function InstallApp() {
    const [supportsPWA, setSupportsPWA] = useState(true);
    const [promptInstall, setPromptInstall] = useState(null);

    // useEffect(() => {
    //     const handler = (e) => {
    //         setSupportsPWA(true);
    //         setPromptInstall(e);
    //     };

    //     window.addEventListener("beforeinstallprompt", handler);

    //     return () => {
    //         window.removeEventListener("beforeinstallprompt", handler);
    //     };
    // }, []);

    useEffect(() => {
        let deferredPrompt; // To store the deferred prompt

        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault(); // Prevent the default browser prompt
            deferredPrompt = event; // Store the deferred prompt for later use

            // Show your custom add-to-home-screen UI and handle the user interaction
            // For example, display a banner with a button to add the app to the home screen
            showAddToHomeScreenUI();
        };

        const showAddToHomeScreenUI = () => {
            // Display your custom UI for adding the app to the home screen
            // This can be a banner, modal, or any other UI element

            // Example: Display a banner with a button to add the app to the home screen
            const banner = document.createElement('div');
            banner.innerHTML = `
            <div class="add-to-home-screen-banner">
              <p>Add this app to your home screen for quick access.</p>
              <button class="add-to-home-screen-button">Add to Home Screen</button>
            </div>
          `;


            // Handle the button click event to prompt the user to install the app
            const addToHomeScreenButton = banner.querySelector('.add-to-home-screen-button');
            addToHomeScreenButton.addEventListener('click', () => {
                deferredPrompt.prompt(); // Show the install prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    } else {
                        console.log('User dismissed the install prompt');
                    }
                    deferredPrompt = null; // Reset the deferred prompt
                });
            });

            // Add the banner to your web application's DOM
            document.body.appendChild(banner);
        };

        // Add the event listener for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);



    const onClick = (e) => {
        e.preventDefault();
        if (promptInstall) {
            promptInstall.prompt();
            promptInstall.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
            });
        } else {
            return;
        }
    };

    return (
        supportsPWA && (<button style={styles} onClick={(e) => onClick(e)}>Install</button>)
    );
}
