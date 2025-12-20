# Blender Edit Mode Basics

> Week 1 | Thursday | Blender

## Curriculum Task

**Evening (30 min):** Edit Mode Basics
- Open `week1_cube.blend`
- Enter Edit Mode (`Tab`)
- Learn selection modes: vertex, edge, face
- Extrude a face (`E`) — make your cube into an L-shape
- Loop cut (`Ctrl+R`) — add geometry
- Save as `week1_shape.blend`

## Written Resources

### Edit Mode Basics (Blender Knowledgebase)
- **URL:** https://www.katsbits.com/codex/edit-mode-basics/
- **Why:** Focused guide on Edit Mode tools and workflow
- **Key takeaways:**
  - Tab key toggles between Object Mode and Edit Mode
  - Edit Mode reveals the mesh: vertices, edges, and faces
  - Toolbar appears on left with editing tools
  - Green icons = additive tools (adds geometry)

### Four Basic Tools of Hard Surface Modeling (Brandon3D)
- **URL:** https://brandon3d.com/blender-3d-hard-surface-modeling-basics/
- **Why:** Covers the four essential tools: Extrude, Inset, Loop Cut, Bevel
- **Key takeaways:**
  - These four tools handle 90% of basic modeling
  - Extrude (E) = extend geometry outward
  - Loop Cut (Ctrl+R) = add edge loops for more detail
  - Start with big shapes, add detail with loop cuts

### Edit Mode Tools for Meshes (Blender Basics)
- **URL:** https://www.blenderbasics.com/blog/edit_mode_tools/
- **Why:** Visual guide to all mesh editing tools
- **Key takeaways:**
  - Selection modes: 1=Vertex, 2=Edge, 3=Face
  - Extrude works on any selection (vertex, edge, or face)
  - Loop Cut only works on quad faces (4 vertices)

## Video Resources

### Blender Beginner Tutorial - Editing (Blender Guru)
- **URL:** https://www.youtube.com/watch?v=imdYIdv8F4w (search "Blender Guru beginner editing")
- **Duration:** ~20 min
- **Why:** Continues from Part 1, covers Edit Mode essentials
- **Timestamps:**
  - 0:00 - Entering Edit Mode
  - 2:00 - Selection modes (vertex, edge, face)
  - 5:00 - Extrude basics
  - 10:00 - Loop cuts
  - 15:00 - Practical example

### How to Use Loop Cut and Slide (CGian)
- **URL:** https://cgian.com/how-to-use-blender-loop-cut-and-slide/
- **Duration:** ~10 min
- **Why:** Focused tutorial specifically on Loop Cut tool
- **Timestamps:**
  - 0:00 - What is a loop cut
  - 2:00 - Basic usage (Ctrl+R)
  - 4:00 - Adjusting number of cuts
  - 6:00 - Sliding cuts
  - 8:00 - Common issues

## Quick Reference

### Entering Edit Mode
1. Select your object (left-click)
2. Press **Tab** to enter Edit Mode
3. Press **Tab** again to exit back to Object Mode

### Selection Modes
| Mode | Shortcut | What it Selects |
|------|----------|-----------------|
| Vertex | 1 | Individual points |
| Edge | 2 | Lines between vertices |
| Face | 3 | Filled surfaces |

### Selection Tools
| Action | Shortcut |
|--------|----------|
| Select | Left Click |
| Add to Selection | Shift + Left Click |
| Select All | A |
| Deselect All | Alt + A |
| Box Select | B |
| Select Linked | L (hover over mesh) |

### Extrude Tool (E)
1. Select face(s) you want to extrude
2. Press **E**
3. Move mouse to pull out new geometry
4. **Left-click** to confirm
5. **Right-click** to cancel

**Pro tips:**
- After pressing E, press **X, Y, or Z** to constrain direction
- Type a number for exact distance (e.g., E → Z → 2 = extrude 2 units up)

### Loop Cut Tool (Ctrl+R)
1. Press **Ctrl + R**
2. Hover over an edge — yellow preview line appears
3. **Scroll wheel** to add more cuts
4. **Left-click** to confirm placement
5. Move mouse to slide the cut
6. **Left-click** again to confirm position
7. OR **Right-click** to center the cut

**Important:** Loop cuts only work on **quad faces** (4 vertices). If you have triangles, the cut won't go through.

### Making an L-Shape (This Week's Goal)
1. Open `week1_cube.blend`
2. Tab into Edit Mode
3. Press **3** for Face selection mode
4. Select the **top face** of the cube
5. Press **E** then move mouse up — creates a column
6. Left-click to confirm
7. Select a **side face** of the column
8. Press **E** then move mouse outward — creates the L
9. Left-click to confirm
10. **Ctrl + S** → Save As `week1_shape.blend`

### Common Mistakes to Avoid
- Extruding and then canceling with Esc (leaves duplicate vertices)
- Trying to loop cut through triangles
- Forgetting which mode you're in (check top-left corner)
- Not saving frequently

### Keyboard Cheat Sheet
| Action | Shortcut |
|--------|----------|
| Edit Mode Toggle | Tab |
| Vertex Mode | 1 |
| Edge Mode | 2 |
| Face Mode | 3 |
| Extrude | E |
| Loop Cut | Ctrl + R |
| Undo | Ctrl + Z |
| Save | Ctrl + S |
| Save As | Ctrl + Shift + S |
