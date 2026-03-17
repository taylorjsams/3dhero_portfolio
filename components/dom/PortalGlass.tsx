'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

interface PortalGlassProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    glassClassName?: string;
}

export default function PortalGlass({ children, className = '', glassClassName = '', ...props }: PortalGlassProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    
    // Track bounds relative to the document
    const [bounds, setBounds] = useState({ top: 0, left: 0, width: 0, height: 0 });

    const { scrollY } = useScroll();

    // Map the window scroll directly to the fixed Y position of the portal.
    // We add the initial top offset, but subtract the scroll distance.
    const yTransform = useTransform(scrollY, (y) => bounds.top - y);
    
    // Combine X and Y into a high-performance translate3d template
    const transformTemplate = useMotionTemplate`translate3d(${bounds.left}px, ${yTransform}px, 0)`;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !containerRef.current) return;

        let animationFrameId: number;
        let lastTop = 0;
        let lastLeft = 0;
        let lastWidth = 0;
        let lastHeight = 0;

        const trackLayout = () => {
            if (containerRef.current) {
                // Get the box relative to the viewport
                const rect = containerRef.current.getBoundingClientRect();
                
                // Convert viewport top to absolute document top
                // This value remains perfectly constant during standard scrolling,
                // but WILL change if the element is moved via CSS transforms (like Framer Motion)
                // or if elements above it change size.
                const absoluteTop = rect.top + window.scrollY;
                const absoluteLeft = rect.left + window.scrollX;

                // Only trigger a React re-render if the position physically changed in the document
                // Use a 0.5px tolerance to ignore sub-pixel flutter during scrolling
                if (Math.abs(lastTop - absoluteTop) > 0.5 || 
                    Math.abs(lastLeft - absoluteLeft) > 0.5 ||
                    Math.abs(lastWidth - rect.width) > 0.5 ||
                    Math.abs(lastHeight - rect.height) > 0.5) {
                    
                    lastTop = absoluteTop;
                    lastLeft = absoluteLeft;
                    lastWidth = rect.width;
                    lastHeight = rect.height;

                    setBounds({
                        top: absoluteTop,
                        left: absoluteLeft,
                        width: rect.width,
                        height: rect.height
                    });
                }
            }
            animationFrameId = requestAnimationFrame(trackLayout);
        };

        // Start tracking
        animationFrameId = requestAnimationFrame(trackLayout);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted]);

    return (
        <div ref={containerRef} className={className} {...props}>
            {children}
            {mounted && createPortal(
                <motion.div 
                    className={glassClassName} 
                    style={{ 
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: bounds.width,
                        height: bounds.height,
                        zIndex: -1, 
                        pointerEvents: 'none',
                        // GPU Accelerated Transform mapped directly to Scroll
                        transform: transformTemplate,
                        transformOrigin: 'top left'
                    }} 
                />,
                document.body
            )}
        </div>
    );
}
