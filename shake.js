function initShake() {
    let shakeThreshold = 15;
    let lastX, lastY, lastZ;
    let lastTime = new Date().getTime();

    // Array de poses del Kamasutra
    const kamasutraPoses = [
        { nombre: "Misionero", descripcion: "Posición clásica frente a frente." },
        { nombre: "Vaquera", descripcion: "La pareja superior controla el ritmo." },
        { nombre: "Cucharita", descripcion: "Ambos acostados de lado, íntima y cómoda." },
        { nombre: "De pie", descripcion: "Posición vertical para variedad y diversión." },
        { nombre: "Andromeda", descripcion: "Posición más creativa y desafiante." }
    ];

    // Crear pop-up dinámico
    const popup = document.createElement('div');
    popup.id = "popup";
    popup.style.display = "none";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "12px";
    popup.style.boxShadow = "0 0 15px rgba(0,0,0,0.5)";
    popup.style.textAlign = "center";
    popup.style.zIndex = "1000";

    const poseName = document.createElement('h2');
    const poseDesc = document.createElement('p');
    const closeBtn = document.createElement('button');
    closeBtn.textContent = "Cerrar";
    closeBtn.style.padding = "8px 15px";
    closeBtn.style.border = "none";
    closeBtn.style.background = "#ff4081";
    closeBtn.style.color = "white";
    closeBtn.style.borderRadius = "6px";
    closeBtn.style.cursor = "pointer";

    closeBtn.addEventListener('click', () => { popup.style.display = 'none'; });

    popup.appendChild(poseName);
    popup.appendChild(poseDesc);
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);

    // Función para mostrar pose aleatoria
    function mostrarPoseRandom() {
        const pose = kamasutraPoses[Math.floor(Math.random() * kamasutraPoses.length)];
        poseName.textContent = pose.nombre;
        poseDesc.textContent = pose.descripcion;
        popup.style.display = 'block';
    }

    // Función que escucha el movimiento
    function startListening() {
        window.addEventListener("devicemotion", function(event) {
            let acc = event.accelerationIncludingGravity;
            if (!acc) return;

            let currentTime = new Date().getTime();
            if (currentTime - lastTime > 100) {
                let deltaX = lastX !== undefined ? Math.abs(acc.x - lastX) : 0;
                let deltaY = lastY !== undefined ? Math.abs(acc.y - lastY) : 0;
                let deltaZ = lastZ !== undefined ? Math.abs(acc.z - lastZ) : 0;

                if (deltaX + deltaY + deltaZ > shakeThreshold) {
                    mostrarPoseRandom();
                }

                lastX = acc.x;
                lastY = acc.y;
                lastZ = acc.z;
                lastTime = currentTime;
            }
        });
    }

    // Crear botón para iniciar detección en iOS
    const startButton = document.createElement('button');
    startButton.textContent = "Iniciar detección";
    startButton.style.padding = "10px 20px";
    startButton.style.margin = "20px";
    startButton.style.fontSize = "16px";
    startButton.style.cursor = "pointer";
    document.body.appendChild(startButton);

    startButton.addEventListener('click', () => {
        if (typeof DeviceMotionEvent !== 'undefined' &&
            typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        startListening();
                        startButton.style.display = 'none';
                        alert("¡Detección activada! Agita tu teléfono.");
                    } else {
                        alert("Permiso denegado para usar sensores de movimiento");
                    }
                })
                .catch(console.error);
        } else {
            // Android o navegadores que no requieren permiso
            startListening();
            startButton.style.display = 'none';
            alert("¡Detección activada! Agita tu teléfono.");
        }
    });
}

// Inicializar cuando cargue la página
window.addEventListener("load", initShake);
