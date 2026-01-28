# React Test App

## 📋 Introduction

This is a complete Next.js base project built with modern technologies and libraries, providing a solid foundation for developing web applications.

## 🔧 System Requirements

### Node.js
- **Minimum version**: Node.js >= 18.17.0
- **Recommended version**: Node.js 20.x LTS (Long Term Support)
- **Reason**: Next.js 15 and React 19 require Node.js 18.17.0 or higher to ensure compatibility and optimal performance.

### Package Manager
- **npm**: >= 9.x
- **yarn**: >= 1.22.x
- **pnpm**: >= 8.x (recommended for better performance)

### Check Node.js version

```bash
node --version
```

If your version is lower than 18.17.0, please update Node.js:

#### How to install/upgrade Node.js

**Option 1: Download from the official website (recommended)**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (20.x)
3. Install following the instructions

**Option 2: Use nvm (Node Version Manager) – recommended for developers**

**Windows:**
```bash
# Download nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
# After installation:
nvm install 20.11.0
nvm use 20.11.0
```

**macOS/Linux:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20
```

## 🚀 Installation

### 1. Clone the project

```bash
git clone [repository-url]
cd React-test
```

### 2. Install dependencies

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

**Using pnpm (recommended):**
```bash
pnpm install
```

### 3. Configure Environment Variables

Create `.env.local` from the example file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with appropriate values:

```env
# Server Configuration
PORT=3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# App Configuration
NEXT_PUBLIC_APP_NAME=React Test App

# Optional: External API Keys
# NEXT_PUBLIC_API_KEY=your_api_key_here
```

**Note**: If you change `PORT`, update `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL` accordingly.

### 4. Husky (Git Hooks) Setup

Husky is automatically installed when you run `npm install` thanks to the `prepare` script in `package.json`.

If you need to install it manually:

```bash
npm run prepare
```

## 🏃 Running the Project

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

**Turbo Mode notes**: 
- Turbo mode only works when the SWC native module loads correctly.
- If you get SWC errors (WASM fallback), Turbo will not work.
- The default `dev` script does not use Turbo to avoid errors.
- If the SWC native module works, you can use:
```bash
npm run dev:turbo  # Only use when the SWC native module works
```

**Using port from environment variable:**

```bash
# Use PORT from .env.local (default 3000)
npm run dev:port

# Or set the port directly
PORT=3001 npm run dev
```

Open the browser at `http://localhost:${PORT}` (default 3000).

### Production Build

```bash
npm run build
npm run start
```

**Using port from environment variable:**

```bash
# Use PORT from .env.production (default 3000)
npm run start:port

# Or set the port directly
PORT=3001 npm run start
```

### Lint & Format Code

```bash
# Run lint
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting (no auto-fix)
npm run format:check

# TypeScript type checking
npm run type-check
```

## 📁 Folder Structure

The project uses **Feature-Sliced Design** to organize code clearly and keep it maintainable:

```
project-root/
├── src/
│   ├── app/                    # Next.js App Router - Routing & Layout
│   │   ├── (auth)/             # Route group for authentication
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (main)/             # Route group for main app
│   │   │   ├── columns/
│   │   │   ├── my-record/
│   │   │   └── layout.tsx
│   │   ├── api/               # API routes (Next.js API routes)
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Loading UI
│   │   ├── error.tsx          # Error boundary
│   │   └── not-found.tsx     # 404 page
│   │
│   ├── features/               # FEATURE = FE logic (per feature)
│   │   ├── auth/
│   │   │   ├── components/     # Auth-specific components (if any)
│   │   │   ├── hooks/          # useAuth.ts
│   │   │   ├── auth.api.ts     # Re-export from api/endpoints
│   │   │   ├── auth.store.ts   # Zustand store for auth
│   │   │   └── types.ts        # Auth-specific types
│   │   ├── columns/
│   │   │   └── components/
│   │   ├── home/
│   │   │   └── components/
│   │   ├── my-record/
│   │   │   └── components/
│   │   └── profile/
│   │       └── components/     # Profile-specific components (if any)
│   │
│   ├── shared/                 # SHARED – NO BUSINESS LOGIC
│   │   ├── components/
│   │   │   ├── ui/             # Shared UI components (Button, Input, Modal, Card, Loading)
│   │   │   └── layout/         # Layout components (Header, Footer, MainLayout)
│   │   ├── hooks/              # useDebounce, useLocalStorage, useMediaQuery
│   │   ├── types/              # api.types.ts, user.types.ts
│   │   └── constants/          # routes.ts
│   │
│   ├── api/                    # FE API LAYER (fetch/axios)
│   │   ├── http.ts             # Axios instance
│   │   ├── interceptors.ts     # Request/Response interceptors
│   │   └── endpoints.ts        # authApi, userApi
│   │
│   ├── store/                  # GLOBAL CLIENT STATE (optional)
│   │   └── app.store.ts        # Global store if needed
│   │
│   ├── lib/                    # Third-party configs
│   │   └── zod-schemas.ts     # Zod validation schemas
│   │
│   ├── utils/                  # PURE UTILS (no React/Next dependency)
│   │   ├── format.ts           # Formatting functions
│   │   ├── validate.ts         # Validation functions
│   │   └── storage.ts          # LocalStorage utilities
│   │
│   ├── styles/                 # SASS styles
│   │   ├── globals.scss        # Global styles
│   │   ├── _variables.scss     # SASS variables
│   │   ├── _mixins.scss        # SASS mixins
│   │   ├── _bootstrap-custom.scss  # Bootstrap overrides
│   │   ├── _typography.scss    # Typography styles
│   │   └── _utilities.scss     # Utility classes
│   │
│   ├── middleware.ts           # Next.js middleware (auth, locale)
│   └── env.ts                  # NEXT_PUBLIC_* environment helpers
│
├── public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .husky/                    # Git hooks
│   ├── pre-commit
│   └── commit-msg
│
├── .env.local.example          # Environment variables template
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

### Structure Explanation

- **`app/`**: Next.js App Router – defines routes and layouts.
- **`features/`**: Business logic per feature (auth, dashboard, profile, etc.).
  - Each feature has its own `components/` folder for feature-specific components.
- **`shared/`**: Shared code, not tied to specific business logic.
  - `shared/components/ui/`: Shared UI components (Button, Input, Modal, Card, Loading).
  - `shared/components/layout/`: Layout components (Header, Footer, MainLayout).
- **`api/`**: API layer (Axios instance, interceptors, endpoints).
- **`utils/`**: Pure utility functions (no React/Next dependency).
- **`lib/`**: Configurations for third-party libraries.
- **`styles/`**: SASS styles and Bootstrap customization.

### ⚠️ Lưu ý quan trọng:

- **KHÔNG có `src/components/`** - Đã được refactor sang cấu trúc Feature-Sliced Design
- **KHÔNG có `src/store/`** - Đã chuyển sang `src/features/auth/auth.store.ts`
- **KHÔNG có `src/services/`** - Đã chuyển sang `src/api/`
- **KHÔNG có `src/types/`** - Đã chuyển sang `src/shared/types/`
- **KHÔNG có `src/constants/`** - Đã chuyển sang `src/shared/constants/`
- **KHÔNG có `src/hooks/`** - Đã chuyển sang `src/shared/hooks/`
- Components dùng chung → `src/shared/components/`
- Components theo feature → `src/features/{feature}/components/`

> 💡 **Xem file `CLEANUP_INSTRUCTIONS.md`** để biết cách xóa các thư mục cũ nếu còn sót lại.

## 🛠️ Tech Stack

### Core Framework
- **Next.js**: 15.0.0+ (App Router)
- **React**: 19.0.0+
- **TypeScript**: 5.6.3+ (strict mode)

### State Management
- **Zustand**: 5.0.2+ (Lightweight state management)
- **Immer**: 10.1.1+ (Immutable state updates)

### Data Fetching
- **Axios**: 1.7.7+ (HTTP client with interceptors)
- **Note**: React Query has been removed to optimize performance and reduce bundle size.

### Form & Validation
- **React Hook Form**: 7.53.2+ (Form management)
- **Zod**: 3.23.8+ (Schema validation)
- **@hookform/resolvers**: 3.9.1+ (Form validation integration)

### UI & Styling
- **Bootstrap**: 5.3.3+ (CSS framework)
- **React Bootstrap**: 2.10.4+ (Bootstrap components)
- **SASS/SCSS**: 1.83.0+ (CSS preprocessor)
- **React Icons**: 5.3.0+ (Icon library)
- **clsx**: 2.1.1+ (Conditional classnames)

### Utilities
- **date-fns**: 4.1.0+ (Date manipulation)

### Code Quality
- **ESLint**: 8.57.1+ (Code linting)
- **Prettier**: 3.3.3+ (Code formatting)
- **Husky**: 9.1.6+ (Git hooks)
- **lint-staged**: 15.2.11+ (Pre-commit linting)
- **Commitlint**: 19.5.0+ (Commit message linting)

## 📝 Code Conventions

### Naming Conventions
- **Component names**: PascalCase (e.g. `Button`, `UserProfile`)
- **File names**: camelCase.tsx (e.g. `button.tsx`, `userProfile.tsx`)
- **Constants**: UPPER_SNAKE_CASE (e.g. `API_BASE_URL`, `MAX_RETRIES`)
- **Functions**: camelCase (e.g. `getUserData`, `handleSubmit`)
- **Interfaces/Types**: PascalCase with `I` prefix for interfaces (e.g. `IUser`, `IButtonProps`)

### File Structure
- Each component has its own folder:
  - Component file: `ComponentName.tsx`
  - Styles: `ComponentName.module.scss`
  - Index: `index.ts` (export component and types)

### TypeScript
- Use strict mode.
- Always define types for props, state, and functions.
- Avoid `any`; prefer `unknown` if necessary.

### Code Style
- Use functional components with hooks.
- Prefer named exports.
- Add comments for complex functions.
- Use ESLint and Prettier to maintain consistency.

## 🔒 Environment Variables

### Server Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Port for development/production server | `3000` | No (default: 3000) |

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for the API | `http://localhost:3000/api` |
| `NEXT_PUBLIC_APP_URL` | Base URL of the app | `http://localhost:3000` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name | `React Test App` |
| `NEXT_PUBLIC_API_KEY` | API key for external services | `your_api_key` |

**Notes**:
- Environment variables starting with `NEXT_PUBLIC_` are exposed on the client side.
- `PORT` is server-side only; it does **not** need the `NEXT_PUBLIC_` prefix.
- If you change `PORT`, remember to update `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_APP_URL` accordingly.

## 🧪 Testing

### Run tests (when set up)

```bash
npm test
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker container**

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Add a new feature
- `fix`: Fix a bug
- `docs`: Documentation changes
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Add tests
- `chore`: Build process, tooling
- `revert`: Revert a previous commit

## 📄 License

[MIT License](LICENSE) – see the LICENSE file for details.

## 🆘 Troubleshooting

### "Module not found" error

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Type checking
npm run type-check

# Clear Next.js build cache
rm -rf .next
npm run build
```

### SASS errors

```bash
# Ensure sass is installed
npm install sass --save-dev
```

### Port already in use

```bash
# Option 1: Use PORT from environment variable
PORT=3001 npm run dev

# Option 2: Use script with port
npm run dev:port  # Uses PORT from .env.local

# Option 3: Set directly in .env.local
# PORT=3001
```

### "@next/swc-win32-x64-msvc is not a valid Win32 application" and "turbo.createProject is not supported"

**Cause:**
- SWC native module is corrupted or incompatible with your system.
- Next.js falls back to WASM (10–20x slower).
- Turbo mode does not work with WASM bindings.

**How to fix (try in order):**

```bash
# Option 1: Clear cache and reinstall (recommended)
# Close all open terminals/editors first
npm cache clean --force
rm -rf node_modules package-lock.json .next
npm install

# Option 2: On Windows PowerShell
npm cache clean --force
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install

# Option 3: Rebuild native modules
npm rebuild

# Option 4: Reinstall Next.js and specific SWC packages
npm uninstall next
npm install next@latest
npm install @next/swc-win32-x64-msvc --save-optional

# Option 5: Check Node.js version (must be >= 18.17.0)
node --version
# If version is lower, upgrade Node.js
```

**Notes**:
- If files are locked (Access denied):
  1. Close all open terminals/editors.
  2. Kill running Node.js processes (Task Manager).
  3. Try the steps again.
- After fixing, the app will be significantly faster (10–20x).
- You can use `npm run dev:turbo` afterwards for additional speed-up.

### App is slow in Development Mode

If the app is slow when running `npm run dev`, possible reasons:

**1. SWC native module does not load (common on Windows)**
- Next.js falls back to WASM (much slower).
- **Solution**: See the SWC fix section above.

**2. Turbo Mode does not work with WASM**
- Turbo mode only works when the SWC native module loads.
- When SWC falls back to WASM, Turbo throws `turbo.createProject is not supported`.
- **Solution**: Fix the SWC native module (see 1) or do not use Turbo mode.
- The default `dev` script does **not** use Turbo to avoid this issue.
- Once SWC native module works, you can use `npm run dev:turbo`.

**3. Middleware running on too many routes**
- Middleware has been optimized to skip static files.
- If it's still slow, check `src/middleware.ts` logic.

**4. Font loading**
- Fonts are optimized with `display: swap` and preload.
- CSS variables are used for further optimization.

**5. Bootstrap and SASS compilation**
- SASS is configured with an optimal output style.
- Bootstrap is imported once in `globals.scss`.

**6. Webpack cache issues**

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**7. Too many dependencies**
- Unnecessary packages (lodash-es, crypto-js, etc.) have been removed.
- Only essential packages are kept.

**Optimizations already applied:**
- ✅ Optimized Webpack watch options
- ✅ Optimized middleware matcher (skip static files)
- ✅ Optimized font loading (swap, preload, CSS variables)
- ✅ Optimized SASS compilation
- ✅ Image optimization
- ✅ SWC minifier (default in Next.js 15)

**Turbo Mode notes:**
- Turbo mode only works when the SWC native module loads.
- When SWC falls back to WASM, Turbo will not work.
- The default `dev` script does **not** use Turbo to avoid errors.
- After fixing SWC, you can use `npm run dev:turbo` for extra speed.

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Bootstrap Documentation](https://getbootstrap.com/docs)

## 👥 Authors

- Your Name – [linhnqdev](https://github.com/linhnqdev)

## 🙏 Acknowledgments

- Next.js team
- React team
- All maintainers of the open source libraries used in this project
