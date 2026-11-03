/**
 * OrbitalPortal — 3D Cyber Nebula Interactive Visual World
 * Follows Three.js Skill guidelines:
 * - 3–12 part procedural composite model (THREE.Group)
 * - Studio PBR lighting with RoomEnvironment + PMREMGenerator
 * - ACESFilmicToneMapping, SRGBColorSpace, soft contact grounding
 * - Software-WebGL detector and pacing loop with fenceSync
 * - Exponential damping for pointer parallax and camera maneuvers
 * - Dynamic theme color response
 * - Reduced motion support
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ThemeColors } from '../data/themes';

interface OrbitalPortalProps {
  theme: ThemeColors;
  className?: string;
}

export const OrbitalPortal: React.FC<OrbitalPortalProps> = ({ theme, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState<boolean>(true);
  const [cameraMode, setCameraMode] = useState<'perspective' | 'wide' | 'zen'>('perspective');

  // Keep theme colors in ref so the animation loop can damp colors smoothly without tearing down the WebGL scene
  const themeRef = useRef<ThemeColors>(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const cameraModeRef = useRef(cameraMode);
  useEffect(() => {
    cameraModeRef.current = cameraMode;
  }, [cameraMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Software WebGL detection
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as WebGLRenderingContext).RENDERER;
        const gpu = String((gl as WebGLRenderingContext).getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme.bgPrimary, 0.065);

    // 3. Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 0.8, 6.5);

    // Target camera positions for damping
    const targetCameraPos = new THREE.Vector3(0, 0.8, 6.5);
    const targetCameraLookAt = new THREE.Vector3(0, 0, 0);
    const currentCameraLookAt = new THREE.Vector3(0, 0, 0);

    // 4. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
      preserveDrawingBuffer: false,
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 5. Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 6. Studio Lighting Rig
    const warmKeyLight = new THREE.DirectionalLight(new THREE.Color(theme.primary), 2.8);
    warmKeyLight.position.set(4, 5, 4);
    if (!isSoftwareGl) {
      warmKeyLight.castShadow = true;
      warmKeyLight.shadow.mapSize.width = 1024;
      warmKeyLight.shadow.mapSize.height = 1024;
      warmKeyLight.shadow.camera.near = 0.5;
      warmKeyLight.shadow.camera.far = 15;
      warmKeyLight.shadow.camera.left = -4;
      warmKeyLight.shadow.camera.right = 4;
      warmKeyLight.shadow.camera.top = 4;
      warmKeyLight.shadow.camera.bottom = -4;
      warmKeyLight.shadow.bias = -0.0005;
      warmKeyLight.shadow.normalBias = 0.02;
    }
    scene.add(warmKeyLight);

    const coolFillLight = new THREE.HemisphereLight(
      new THREE.Color(theme.secondary),
      new THREE.Color(theme.bgPrimary),
      1.5
    );
    scene.add(coolFillLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(theme.accent), 1.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // 7. COMPOSITE PROCEDURAL SUBJECT (THREE.Group with 8 parts)
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 0, 0);
    scene.add(portalGroup);

    // Part 1: Central Core Sphere (Smooth physical metallic crystal)
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 4);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.primary),
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 0.28,
      roughness: 0.12,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = !isSoftwareGl;
    portalGroup.add(coreMesh);

    // Part 2: Inner Geodesic Cage (Wireframe lattice)
    const cageGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const cageMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.secondary),
      wireframe: true,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.55,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    portalGroup.add(cageMesh);

    // Part 3: Primary Tilted Gimbal Ring
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.038, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.secondary),
      roughness: 0.2,
      metalness: 0.95,
      emissive: new THREE.Color(theme.secondary),
      emissiveIntensity: 0.2,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    ring1Mesh.rotation.y = Math.PI / 6;
    portalGroup.add(ring1Mesh);

    // Part 4: Secondary Counter-Rotating Ring
    const ring2Geo = new THREE.TorusGeometry(2.65, 0.032, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.lavender),
      roughness: 0.25,
      metalness: 0.9,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 4;
    ring2Mesh.rotation.z = Math.PI / 5;
    portalGroup.add(ring2Mesh);

    // Part 5: Equatorial Latitude Halo Ring with subtle dashed tick marks
    const ring3Geo = new THREE.TorusGeometry(3.15, 0.024, 16, 140);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.accent),
      roughness: 0.35,
      metalness: 0.85,
    });
    const ring3Mesh = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3Mesh.rotation.x = Math.PI / 2.1;
    portalGroup.add(ring3Mesh);

    // Part 6: Floating Orbital Satellite Crystals (Octahedrons)
    const satellitesGroup = new THREE.Group();
    const satGeo = new THREE.OctahedronGeometry(0.12);
    const satMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.secondary),
      roughness: 0.1,
      metalness: 0.9,
      emissive: new THREE.Color(theme.secondary),
      emissiveIntensity: 0.4,
    });

    const satCount = 6;
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      satellitesGroup.add(sat);
      satellites.push(sat);
    }
    portalGroup.add(satellitesGroup);

    // Part 7: Ambient Particle Field (InstancedMesh for performance)
    const particleCount = isSoftwareGl ? 75 : 220;
    const particleGeo = new THREE.OctahedronGeometry(0.04, 0);
    const particleMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(theme.secondary),
      transparent: true,
      opacity: 0.75,
    });
    const particleInstanced = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    particleInstanced.frustumCulled = false;

    const dummy = new THREE.Object3D();
    const particleSeeds: { radius: number; theta: number; phi: number; speed: number; yOffset: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.85;
      const speed = (0.2 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1);
      const yOffset = (Math.random() - 0.5) * 1.5;

      particleSeeds.push({ radius, theta, phi, speed, yOffset });

      dummy.position.set(
        radius * Math.cos(phi) * Math.cos(theta),
        radius * Math.sin(phi) + yOffset,
        radius * Math.cos(phi) * Math.sin(theta)
      );
      const scale = 0.5 + Math.random() * 1.0;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      particleInstanced.setMatrixAt(i, dummy.matrix);
    }
    particleInstanced.instanceMatrix.needsUpdate = true;
    portalGroup.add(particleInstanced);

    // Part 8: Soft Contact Shadow Grounding Disc
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 256;
    groundCanvas.height = 256;
    const ctx = groundCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
      gradient.addColorStop(0, 'rgba(146, 92, 255, 0.45)');
      gradient.addColorStop(0.35, 'rgba(85, 230, 255, 0.2)');
      gradient.addColorStop(0.7, 'rgba(7, 8, 23, 0.1)');
      gradient.addColorStop(1, 'rgba(7, 8, 23, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const groundTexture = new THREE.CanvasTexture(groundCanvas);
    groundTexture.colorSpace = THREE.SRGBColorSpace;
    const groundGeo = new THREE.PlaneGeometry(7.5, 7.5);
    const groundMat = new THREE.MeshBasicMaterial({
      map: groundTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -2.2;
    portalGroup.add(groundMesh);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 8. Pointer tracking with smooth exponential damping
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.targetX = Math.max(-1, Math.min(1, x));
      pointer.targetY = Math.max(-1, Math.min(1, y));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        pointer.targetX = Math.max(-1, Math.min(1, x));
        pointer.targetY = Math.max(-1, Math.min(1, y));
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Frame loop & Pacing
    let frameId = 0;
    const clock = new THREE.Clock();

    // Reusable math helpers outside loop
    const _targetPrimaryColor = new THREE.Color();
    const _targetSecondaryColor = new THREE.Color();
    const _targetBgColor = new THREE.Color();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl?.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (gl) gl.flush();
      const poll = () => {
        if (!sync) {
          frameId = window.setTimeout(cb, 60);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 6);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 6);
    }

    const tick = () => {
      const dt = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      const currentTheme = themeRef.current;
      const motionScale = prefersReducedMotion ? 0.2 : 1.0;

      // Smooth pointer damping
      pointer.x = THREE.MathUtils.damp(pointer.x, pointer.targetX, 4.0, dt);
      pointer.y = THREE.MathUtils.damp(pointer.y, pointer.targetY, 4.0, dt);

      // Camera preset transitions
      const currentMode = cameraModeRef.current;
      if (currentMode === 'perspective') {
        targetCameraPos.set(pointer.x * 0.9, 0.8 + pointer.y * 0.6, 6.2);
        targetCameraLookAt.set(0, 0, 0);
      } else if (currentMode === 'wide') {
        targetCameraPos.set(pointer.x * 1.5, 2.2 + pointer.y * 0.8, 8.5);
        targetCameraLookAt.set(0, -0.4, 0);
      } else if (currentMode === 'zen') {
        targetCameraPos.set(0, 0.4, 4.8);
        targetCameraLookAt.set(0, 0, 0);
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPos.x, 3.2, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPos.y, 3.2, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPos.z, 3.2, dt);

      currentCameraLookAt.x = THREE.MathUtils.damp(currentCameraLookAt.x, targetCameraLookAt.x, 3.2, dt);
      currentCameraLookAt.y = THREE.MathUtils.damp(currentCameraLookAt.y, targetCameraLookAt.y, 3.2, dt);
      currentCameraLookAt.z = THREE.MathUtils.damp(currentCameraLookAt.z, targetCameraLookAt.z, 3.2, dt);
      camera.lookAt(currentCameraLookAt);

      // Procedural rotational dynamics
      const rotBase = elapsedTime * 0.35 * motionScale;
      portalGroup.rotation.y = rotBase * 0.6 + pointer.x * 0.35;
      portalGroup.rotation.x = Math.sin(rotBase * 0.5) * 0.12 - pointer.y * 0.25;

      coreMesh.rotation.y = -rotBase * 0.8;
      coreMesh.rotation.z = Math.sin(rotBase) * 0.15;

      cageMesh.rotation.y = rotBase * 1.2;
      cageMesh.rotation.x = Math.cos(rotBase * 0.7) * 0.2;

      ring1Mesh.rotation.z = rotBase * 0.9;
      ring2Mesh.rotation.y = -rotBase * 0.75;
      ring3Mesh.rotation.z = rotBase * 0.5;

      // Update orbital satellites
      satellites.forEach((sat, idx) => {
        const offset = (idx / satCount) * Math.PI * 2;
        const radius = 2.4 + Math.sin(rotBase + idx) * 0.2;
        const angle = rotBase * (0.8 + idx * 0.15) + offset;
        sat.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.5) * 0.7,
          Math.sin(angle) * radius
        );
        sat.rotation.x += 0.02 * motionScale;
        sat.rotation.y += 0.03 * motionScale;
      });

      // Update ambient particles
      for (let i = 0; i < particleCount; i++) {
        const p = particleSeeds[i];
        p.theta += p.speed * 0.005 * motionScale;
        dummy.position.set(
          p.radius * Math.cos(p.phi) * Math.cos(p.theta),
          p.radius * Math.sin(p.phi) + p.yOffset + Math.sin(elapsedTime * 0.5 + i) * 0.08,
          p.radius * Math.cos(p.phi) * Math.sin(p.theta)
        );
        dummy.updateMatrix();
        particleInstanced.setMatrixAt(i, dummy.matrix);
      }
      particleInstanced.instanceMatrix.needsUpdate = true;

      // Smooth color transitions from themeRef
      _targetPrimaryColor.set(currentTheme.primary);
      _targetSecondaryColor.set(currentTheme.secondary);
      _targetBgColor.set(currentTheme.bgPrimary);

      coreMat.color.lerp(_targetPrimaryColor, 0.06);
      coreMat.emissive.lerp(_targetPrimaryColor, 0.06);
      cageMat.color.lerp(_targetSecondaryColor, 0.06);
      ring1Mat.color.lerp(_targetSecondaryColor, 0.06);
      ring1Mat.emissive.lerp(_targetSecondaryColor, 0.06);
      ring2Mat.color.lerp(new THREE.Color(currentTheme.lavender), 0.06);
      ring3Mat.color.lerp(new THREE.Color(currentTheme.accent), 0.06);
      satMat.color.lerp(_targetSecondaryColor, 0.06);
      satMat.emissive.lerp(_targetSecondaryColor, 0.06);
      particleMat.color.lerp(_targetSecondaryColor, 0.06);

      warmKeyLight.color.lerp(_targetPrimaryColor, 0.06);
      coolFillLight.color.lerp(_targetSecondaryColor, 0.06);
      coolFillLight.groundColor.lerp(_targetBgColor, 0.06);
      if (scene.fog) {
        scene.fog.color.lerp(_targetBgColor, 0.06);
      }

      // Render
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    // Start loop
    tick();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      // Dispose Three.js objects
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      groundTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Run once on mount; updates happen via refs

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        aria-label="Interactive 3D Orbital Portal"
      />

      {/* Ergonomic Collapsible 3D Viewport Controls (Bottom Dock - Skill compliant) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#101226]/85 border border-[#925CFF]/25 shadow-lg text-xs backdrop-blur-none pointer-events-auto">
        <span className="text-[#A6A9C2] font-mono text-[11px] pr-1.5 border-r border-[#925CFF]/20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#55E6FF]"></span>
          Orbital Visual
        </span>

        <button
          onClick={() => setCameraMode('perspective')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
            cameraMode === 'perspective'
              ? 'bg-[#925CFF]/30 text-[#F5F5FF] border border-[#925CFF]/50'
              : 'text-[#A6A9C2] hover:text-[#F5F5FF]'
          }`}
          title="Interactive 3D dynamic perspective"
        >
          Perspective
        </button>

        <button
          onClick={() => setCameraMode('wide')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
            cameraMode === 'wide'
              ? 'bg-[#925CFF]/30 text-[#F5F5FF] border border-[#925CFF]/50'
              : 'text-[#A6A9C2] hover:text-[#F5F5FF]'
          }`}
          title="Wide orbital overview"
        >
          Wide
        </button>

        <button
          onClick={() => setCameraMode('zen')}
          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
            cameraMode === 'zen'
              ? 'bg-[#925CFF]/30 text-[#F5F5FF] border border-[#925CFF]/50'
              : 'text-[#A6A9C2] hover:text-[#F5F5FF]'
          }`}
          title="Core focus view"
        >
          Core
        </button>
      </div>
    </div>
  );
};
