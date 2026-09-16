# Motion system

Motion must explain a change.

| Semantic | Motion | Default timing |
|---|---|---:|
| new information | fade and short rise | 180-280ms |
| panel from a direction | slide | 350-500ms |
| selected object | scale 1.01-1.03 and border | 120-180ms |
| state change | morph or crossfade | 250-400ms |
| entering detail | drawer | 350-500ms |
| overview to detail | zoom | 600-900ms |
| relationship | path highlight | 300-600ms |

Use ease-out for UI feedback and a more deliberate ease-in-out for scene transitions. Keep one dominant effect per scene. Under `prefers-reduced-motion`, remove travel and drawing while retaining selection, focus, and content order.

Do not use a looping animation to create a sense of quality. The interaction itself should provide the quality signal.
