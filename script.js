// ==========================================
// 1. LÓGICA E RENDERIZAÇÃO DO MODELO 3D (Three.js)
// ==========================================
const container3D = document.getElementById('canvas-container-3d');

// Criando a Cena, Câmera e Renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe0f7fa); // Céu claro azulado

const camera = new THREE.PerspectiveCamera(45, container3D.clientWidth / container3D.clientHeight, 0.1, 1000);
camera.position.set(10, 12, 15);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container3D.clientWidth, container3D.clientHeight);
renderer.shadowMap.enabled = true;
container3D.appendChild(renderer.domElement);

// Iluminação do cenário
const lightAmbient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(lightAmbient);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(15, 20, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// Criando a Maquete do Solo (Base da Fazenda)
const geometryBase = new THREE.BoxGeometry(12, 0.5, 12);
const materialBase = new THREE.MeshStandardMaterial({ color: 0x8d6e63 }); // Cor de terra firme
const soloBase = new THREE.Mesh(geometryBase, materialBase);
soloBase.receiveShadow = true;
scene.add(soloBase);

// Representação de Área Verde/Sustentável (Cubo Verde)
const geoVerde = new THREE.BoxGeometry(4, 1.5, 10);
const matVerde = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.8 });
const blocoVerde = new THREE.Mesh(geoVerde, matVerde);
blocoVerde.position.set(-3.5, 0.9, 0);
blocoVerde.castShadow = true;
scene.add(blocoVerde);

// Representação de Área de Produção Hidropônica/Tecnológica (Cubo Azul/Cinza)
const geoAgroTech = new THREE.BoxGeometry(3, 2, 4);
const matAgroTech = new THREE.MeshStandardMaterial({ color: 0x0288d1 });
const blocoTech = new THREE.Mesh(geoAgroTech, matAgroTech);
blocoTech.position.set(3, 1.1, -3);
blocoTech.castShadow = true;
scene.add(blocoTech);

// Representação de Solo Preparado para Plantio Rotativo (Cubo Laranja/Marrom Claro)
const geoPlantio = new THREE.BoxGeometry(4.5, 0.7, 5);
const matPlantio = new THREE.MeshStandardMaterial({ color: 0xef6c00 });
const blocoPlantio = new THREE.Mesh(geoPlantio, matPlantio);
blocoPlantio.position.set(2.5, 0.5, 2.5);
blocoPlantio.castShadow = true;
scene.add(blocoPlantio);

// Variáveis para Controle de Rotação pelo Mouse/Toque
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

container3D.addEventListener('mousedown', (e) => { isDragging = true; });
container3D.addEventListener('mousemove', (e) => {
    const deltaMove = { x: e.offsetX - previousMousePosition.x, y: e.offsetY - previousMousePosition.y };
    if (isDragging) {
        scene.rotation.y += deltaMove.x * 0.007;
        scene.rotation.x += deltaMove.y * 0.007;
    }
    previousMousePosition = { x: e.offsetX, y: e.offsetY };
});
window.addEventListener('mouseup', () => { isDragging = false; });

// Animação/Renderização contínua leve
function animate() {
    requestAnimationFrame(animate);
    // Rotação autônoma bem suave caso o usuário não mexa
    if (!isDragging) {
        scene.rotation.y += 0.002;
    }
    renderer.render(scene, camera);
}
animate();

// Ajustar tamanho em caso de mudança de tamanho da tela
window.addEventListener('resize', () => {
    camera.aspect = container3D.clientWidth / container3D.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container3D.clientWidth, container3D.clientHeight);
});


// ==========================================
// 2. LÓGICA DA CALCULADORA DE USABILIDADE
// ==========================================
function calcularDivisao() {
    const areaInput = document.getElementById('area-total').value;
    
    if (areaInput <= 0 || areaInput === "") {
        alert("Por favor, digite um valor de hectares válido e maior que zero.");
        return;
    }
    
    // Cálculo aplicando 80% produção e 20% reserva técnica/ambiental sustentável
    const lavouraCalculada = (areaInput * 0.8).toFixed(2);
    const reservaCalculada = (areaInput * 0.2).toFixed(2);
    
    // Atualização em tela com manipulação de DOM plano
    document.getElementById('res-lavoura').innerText = lavouraCalculada;
    document.getElementById('res-reserva').innerText = reservaCalculada;
}


// ==========================================
// 3. CONFIGURAÇÃO DO GRÁFICO (Chart.js)
// ==========================================
const ctx = document.getElementById('graficoSustentavel').getContext('2d');
const graficoSustentavel = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
        datasets: [{
            label: 'Produção com Manejo Sustentável (Sacas/ha)',
            data: [55, 62, 70, 78, 85],
            borderColor: '#2e7d32',
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            borderWidth: 3,
            tension: 0.3
        },
        {
            label: 'Produção Convencional Esgotando o Solo',
            data: [58, 59, 54, 48, 40],
            borderColor: '#d32f2f',
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            borderWidth: 3,
            tension: 0.3,
            borderDash: [5, 5]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { font: { size: 14 } }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: { display: true, text: 'Produtividade Média' }
            }
        }
    }
});
