# Unstable Table

A grid-based tactical PvP game where combat shakes the battlefield, rolling a fate die that unleashes chaotic events.

## Theme
- Roll the Dice (Mini Game Jam 199)

## Core Concept

Combat destabilizes the table. Every death and every strike on the Jarl triggers the Event Die, creating chain reactions of chaos that can turn the tide of battle.

```
┌─────────────────────────┐
│     ENEMY ZONE          │  ← Enemy Jarl (3 HP, off-board)
├─────────────────────────┤
│                         │
│   BATTLEFIELD (3x3)     │  ← Units clash here
│                         │
├─────────────────────────┤
│     PLAYER ZONE         │  ← Your Jarl (3 HP, off-board)
└─────────────────────────┘
        🎲 Event Die (off to side)
```

## Win Condition
- Reduce the enemy Jarl's HP to 0
- Jarl HP: 3

## Turn Structure
- Alternating turns (player → bot → player...)
- Per turn: Move a unit AND/OR Attack

## Table Shake Trigger
The Event Die rolls when:
1. **Jarl takes damage** - A unit crosses through or attacks the Jarl
2. **Any unit dies** - Creates drama throughout the match

This enables **chain reactions**: Kill → Shake → Event kills another unit → Shake again → Cascade!

---

## Units (Kingdom Rush Viking Style)

| Unit | Role | HP | Attack | Range | Special |
|------|------|-----|--------|-------|---------|
| **Viking** | Melee Tank | 3 | 2 | Adjacent | Can shove enemies 1 tile |
| **Shaman** | Support | 2 | 1 | Adjacent | Can heal adjacent ally for 1 HP |
| **Archer** | Ranged DPS | 2 | 2 | 2 tiles (row) | Can shoot over units |

### Starting Party
- 1 Viking, 1 Shaman, 1 Archer (per side)

---

## Event Die (1-6)

| Roll | Event | Description |
|------|-------|-------------|
| **1** | **Ragnarok Rumble** | All units on the battlefield take 1 damage |
| **2** | **Odin's Favor** | The unit that triggered the shake heals 2 HP |
| **3** | **Loki's Trick** | Two random units swap positions |
| **4** | **Thor's Blessing** | Triggering unit's next attack deals +2 damage |
| **5** | **Frost Giant's Breath** | Random column is frozen - units there skip next turn |
| **6** | **Valhalla's Call** | A random dead unit revives with 1 HP |

---

## Battlefield Layout

```
     COL 0    COL 1    COL 2
   ┌────────┬────────┬────────┐
R2 │        │        │        │  ← Closest to Enemy Jarl
   ├────────┼────────┼────────┤
R1 │        │        │        │  ← Midline
   ├────────┼────────┼────────┤
R0 │        │        │        │  ← Closest to Player Jarl
   └────────┴────────┴────────┘
```

- Units spawn from their respective zones
- Reaching the opposite zone = attack on enemy Jarl

---

## Movement & Combat

### Movement
- Units move 1 tile per turn (orthogonal: up/down/left/right)
- Cannot move through other units (unless shoved)

### Combat
- Attack enemies in range
- Damage = Unit's Attack value
- When HP hits 0 → Unit dies → **Table Shakes**

### Jarl Damage
- Unit reaches enemy zone → Deals 1 damage to Jarl → **Table Shakes**
- Unit is then "spent" (removed or returns to spawn?)

---

## Bot AI (Simple)

Priority order:
1. If can attack player unit → Attack
2. If can move toward player zone → Move forward
3. Otherwise → Move toward nearest player unit

---

## Visual Style
- 2D Kingdom Rush-inspired Viking units
- Wooden table aesthetic
- Physical dice that visibly rolls when table shakes
- Screen shake effect on trigger

---

## Scope Notes (Game Jam)

### MVP (Must Have)
- [ ] 3x3 grid battlefield
- [ ] 3 unit types (Viking, Shaman, Archer)
- [ ] Basic movement and attack
- [ ] Event die with 6 events
- [ ] Simple bot AI
- [ ] Win/lose condition

### Nice to Have
- [ ] Unit spawn/deploy phase
- [ ] Multiple rounds
- [ ] Sound effects
- [ ] Particle effects on events
- [ ] Unit animations

### Future Ideas
- Expandable grid (4x4, 5x5)
- More unit types (Berserker, Valkyrie, etc.)
- Equipment/buffs that persist
- Multiplayer (local or online)
