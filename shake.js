function initShake() {
    let shakeThreshold = 15;
    let lastX, lastY, lastZ;
    let lastTime = new Date().getTime();

    function mostrarPoseRandom() {
        alert("¡Se detectó la sacudida!");
        // Aquí puedes reemplazar por tu pop-up con la pose
    }

    function startListening() {
        window.addEventListener("devicemotion", function(event) {
            let acceleration = event.accelerationIncludingGravity;
            let currentTime = new Date().getTime();
            let timeDifference = currentTime - lastTime;

            if (timeDifference > 100) {
                let deltaX = 0, deltaY = 0, deltaZ = 0;

                if (lastX !== undefined) {
                    deltaX = Math.abs(acceleration.x - lastX);
                    deltaY = Math.abs(acceleration.y - lastY);
                    deltaZ = Math.abs(acceleration.z - lastZ);
                }

                if (deltaX + deltaY + deltaZ > shakeThreshold) {
                    mostrarPoseRandom();
                }

                lastX = acceleration.x;
                lastY = acceleration.y;
                lastZ = acceleration.z;
                lastTime = currentTime;
            }
        });
    }

    // Para iOS 13+ pedir permiso
    if (typeof DeviceMotionEvent !== 'undefined' && 
        typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    startListening();
                } else {
                    alert("Permiso denegado para usar sensores de movimiento");
                }
            })
            .catch(console.error);
    } else {
        // Android o navegadores que no requieren permiso
        startListening();
    }
}

// Inicializar cuando cargue la página
window.addEventListener("load", initShake);
