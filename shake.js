function initShake() {
    let shakeThreshold = 15;
    let lastX, lastY, lastZ;
    let lastTime = new Date().getTime();

    // Array de poses del Kamasutra
const kamasutraPoses = [
    { nombre: "Misionero", descripcion: "En la postura del misionero, la persona que va a recibir la penetración se coloca tumbada boca arriba, con las piernas ligeramente abiertas. La persona que va a penetrar, se tumba encima de ella, boca abajo, realizando así la penetración y apoyándose en sus brazos.", imagen: "kamasutra/misionero.png" },
    { nombre: "Vaquera", descripcion: "Esta postura es ideal para estimular el punto G. La persona que va a penetrar se coloca boca arriba, en una superficie que sea plana. La persona que va a ser penetrada se sentará sobre ella, con sus rodillas semiflexionadas como si estuviera cabalgando.", imagen: "kamasutra/vaquera.png" },
    { nombre: "Molinillo de Viento", descripcion: "Para disfrutar de esta postura, debéis colocaros recostadxs unx frente al otrx. Las piernas deben entrelazarse alrededor de la cintura de la otra persona, de manera que ambas pelvis queden unidas.", imagen: "kamasutra/molinilloviento.png" },
    { nombre: "Amazonaa", descripcion: "La persona que va a recibir la penetración se sienta sobre la otra persona, pero ayudándoos de una silla para permanecer sentadxs.", imagen: "kamasutra/amazona.png" },
    { nombre: "Perrito", descripcion: "En esta posición, la persona que recibe la penetración se coloca apoyada sobre sus rodillas y sus manos, como a cuatro patas..", imagen: "kamasutra/perrito.png" },
    { nombre: "Catapulta", descripcion: "En esta posición, la persona que va a penetrar se coloca de rodillas, sujetando las piernas de la persona que va a recibir la penetración, que debe de estar boca arriba y con las piernas en alto.", imagen: "kamasutra/catapulta.png" },
    { nombre: "Ventilador", descripcion: "En esta postura, la persona que recibirá la penetración se coloca apoyando sus brazos sobre alguna superficie elevada, como una mesa o una silla alta, arqueando ligeramente su espalda.", imagen: "kamasutra/ventilador.png" },
    { nombre: "Montaña Magica", descripcion: "La persona que va a recibir la penetración rodea con sus brazos los cojines para mayor comodidad mientras se coloca de rodillas.", imagen: "kamasutra/montañamagica.png" },
    { nombre: "Doble P", descripcion: "La persona que va a recibir la masturbacion se colocará tumbada boca arriba, mientras que la persona que va a realizar el masaje se coloca frente a ella, en una posición cómoda.", imagen: "kamasutra/doblep.png" },
    { nombre: "69", descripcion: "Para disfrutar de esta posición, las dos personas se tumban: una quedará boca arriba, y la otra se tumbará boca abajo, quedando la boca de ambxs a la altura de los genitales de la otra parte.", imagen: "kamasutra/69.png" },
    { nombre: "Saca Corchos", descripcion: "La persona que va a recibir sexo oral se colocará de pie, mientras que la persona que lo hará se coloca delante, sentada en el suelo sobre sus propios pies.", imagen: "kamasutra/sacacorchos.png" },
    { nombre: "La Silla De La Reyna", descripcion: "la persona que va a recibir sexo oral se sienta sobre la cara de la otra persona, que permanecerá boca arriba, pero sin dejar todo el peso caer. Para ayudarte, puedes sostenerte sobre tus caderas o hacer fuerza con las rodillas.", imagen: "kamasutra/silladelareyna.png" },
    { nombre: "La Sirena", descripcion: "La persona que va a recibir sexo oral se tumbará boca arriba, acercando sus genitales todo lo que pueda al borde de la superficie sobre la que esté.", imagen: "kamasutra/sirena.png" },
    { nombre: "El Flautista", descripcion: "La persona que va a recibir sexo oral se tumbará boca arriba, mientras que la persona que va a realizar la estimulación se pondrá a la altura de su miembro, con las rodillas ligeramente flexionadas y boca abajo.", imagen: "kamasutra/flautista.png" },
    { nombre: "Spiderman", descripcion: "Una de las dos personas va a reposar boca arriba, sobre la cama y cerca del borde, mientras la otra persona se coloca de pie agachándose hasta los genitales de la pareja.", imagen: "kamasutra/spiderman.png" },
    { nombre: "Borde de la Cama", descripcion: " la persona que va a recibir la penetración se tumbará boca arriba, colocándose todo lo cerca que pueda del borde de la cama. La persona que va a realizar la penetración, podrá estar de pie para que sea más fácil.", imagen: "kamasutra/bordedelacama.png" },
    { nombre: "La L", descripcion: "En la L, la persona que va a recibir la penetración se tumba boca arriba, rodeando con sus piernas el cuerpo de la persona que va a realizar la penetración.", imagen: "kamasutra/laL.png" }
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

    const poseImg = document.createElement('img');
    poseImg.style.width = "250px";
    poseImg.style.height = "auto";
    poseImg.style.borderRadius = "10px";
    poseImg.style.marginBottom = "10px";

    popup.appendChild(poseImg);
    popup.appendChild(poseName);
    popup.appendChild(poseDesc);
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);

    // Función para mostrar pose aleatoria
    function mostrarPoseRandom() {
        const pose = kamasutraPoses[Math.floor(Math.random() * kamasutraPoses.length)];
        poseName.textContent = pose.nombre;
        poseDesc.textContent = pose.descripcion;
        poseImg.src = pose.imagen; // asigna la imagen
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

