# 🤝 Contributing to CYBER DASH

Thank you for your interest in contributing to **CYBER DASH**! We welcome community contributions including new level sectors, bug fixes, visual improvements, and custom game mechanics.

---

## 🛠️ Development Setup

CYBER DASH is designed with **zero build dependencies** for instant local play.

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/Pierreg99/cyberdash.git
   cd cyberdash
   ```
2. **Run Locally**:
   Simply open `index.html` in any modern web browser, or run the local Node static server:
   ```bash
   npm start
   ```
3. **Run Production Build**:
   ```bash
   node build.js
   ```

---

## 🎨 Level Design Submissions

Want to add an official level to the game?
1. Open the in-game **Custom Level Editor** in `index.html`.
2. Build and playtest your track. Ensure:
   - Jumps are rhythmically aligned with the target BPM.
   - 3 Cyber Coins or Ice Crystals are strategically placed.
   - The difficulty matches the intended tier (EASY, HARD, OMEGA, or CRYO).
3. Export your track data JSON.
4. Add your track to `LEVELS` in `js/levels/level-data.js` and submit a Pull Request!

---

## 📋 Pull Request Workflow

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/new-level-frostbite
   ```
2. Make your edits cleanly with standard ES Module syntax.
3. Test your changes locally across Chrome and Firefox.
4. Commit your changes:
   ```bash
   git commit -m "feat: add Level 17 Frostbite to CRYO tier"
   ```
5. Push and open a Pull Request against `master`.

---

## 📜 Code of Conduct & Standards

- Keep dependencies at **zero external packages** for runtime game play.
- Use vanilla ES Modules with clear module boundaries.
- Ensure all new object types are supported in both `PhysicsEngine.check` and `drawLevelMap`.
- Adhere to the MIT License.
