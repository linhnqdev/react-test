# React Test App

## 📋 Giới thiệu

Dự án Next.js base hoàn chỉnh được xây dựng với các công nghệ và thư viện hiện đại, cung cấp một foundation mạnh mẽ cho việc phát triển ứng dụng web.

## 🔧 Yêu cầu hệ thống

### Node.js
- **Phiên bản tối thiểu**: Node.js >= 18.17.0
- **Phiên bản khuyến nghị**: Node.js 20.x LTS (Long Term Support)
- **Lý do**: Next.js 15 và React 19 yêu cầu Node.js 18.17.0 trở lên để đảm bảo tương thích và hiệu suất tối ưu

### Package Manager
- **npm**: >= 9.x
- **yarn**: >= 1.22.x
- **pnpm**: >= 8.x (khuyến nghị cho hiệu suất tốt hơn)

### Kiểm tra phiên bản Node.js

```bash
node --version
```

Nếu phiên bản của bạn thấp hơn 18.17.0, vui lòng cập nhật Node.js:

#### Cách cài đặt/cập nhật Node.js:

**Option 1: Tải từ trang chủ (Khuyến nghị)**
1. Truy cập [nodejs.org](https://nodejs.org/)
2. Tải phiên bản LTS (20.x)
3. Cài đặt theo hướng dẫn

**Option 2: Sử dụng nvm (Node Version Manager) - Khuyến nghị cho developers**

**Windows:**
```bash
# Tải nvm-windows từ: https://github.com/coreybutler/nvm-windows/releases
# Sau khi cài đặt:
nvm install 20.11.0
nvm use 20.11.0
```

**macOS/Linux:**
```bash
# Cài đặt nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Cài đặt Node.js 20
nvm install 20
nvm use 20
nvm alias default 20
```

## 🚀 Cài đặt

### 1. Clone dự án

```bash
git clone [repository-url]
cd React-test
```

### 2. Cài đặt dependencies

**Với npm:**
```bash
npm install
```

**Với yarn:**
```bash
yarn install
```

**Với pnpm (khuyến nghị):**
```bash
pnpm install
```

### 3. Cấu hình Environment Variables

Tạo file `.env.local` từ file mẫu:

```bash
cp .env.local.example .env.local
```

Chỉnh sửa `.env.local` với các giá trị phù hợp:

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

**Lưu ý**: Nếu bạn thay đổi `PORT`, hãy cập nhật `NEXT_PUBLIC_API_URL` và `NEXT_PUBLIC_APP_URL` cho phù hợp.

### 4. Cài đặt Husky (Git Hooks)

Husky sẽ tự động được cài đặt khi chạy `npm install` nhờ script `prepare` trong package.json.

Nếu cần cài đặt thủ công:

```bash
npm run prepare
```

## 🏃 Chạy dự án

### Development Mode

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

**Lưu ý về Turbo Mode**: 
- Turbo mode chỉ hoạt động khi SWC native module load được
- Nếu gặp lỗi SWC (WASM fallback), Turbo sẽ không hoạt động
- Script `dev` mặc định không dùng Turbo để tránh lỗi
- Nếu SWC native module hoạt động tốt, có thể dùng:
```bash
npm run dev:turbo  # Chỉ dùng khi SWC native module hoạt động
```

**Sử dụng port từ environment variable:**

```bash
# Sử dụng PORT từ .env.local (mặc định 3000)
npm run dev:port

# Hoặc set port trực tiếp
PORT=3001 npm run dev
```

Mở trình duyệt tại `http://localhost:${PORT}` (mặc định là 3000)

### Build Production

```bash
npm run build
npm run start
```

**Sử dụng port từ environment variable:**

```bash
# Sử dụng PORT từ .env.production (mặc định 3000)
npm run start:port

# Hoặc set port trực tiếp
PORT=3001 npm run start
```

### Lint & Format Code

```bash
# Kiểm tra linting
npm run lint

# Tự động sửa linting issues
npm run lint:fix

# Format code với Prettier
npm run format

# Kiểm tra format (không tự động sửa)
npm run format:check

# Kiểm tra TypeScript types
npm run type-check
```

## 📁 Cấu trúc thư mục

Dự án sử dụng **Feature-Sliced Design** để tổ chức code một cách rõ ràng và dễ bảo trì:

```
project-root/
├── src/
│   ├── app/                    # Next.js App Router - Routing & Layout
│   │   ├── (auth)/            # Route group cho authentication
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (main)/            # Route group cho main app
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   └── layout.tsx
│   │   ├── api/               # API routes (Next.js API routes)
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Loading UI
│   │   ├── error.tsx          # Error boundary
│   │   └── not-found.tsx     # 404 page
│   │
│   ├── features/               # FEATURE = LOGIC FE (theo từng feature)
│   │   ├── auth/
│   │   │   ├── components/    # Components riêng của auth (nếu có)
│   │   │   ├── hooks/         # useAuth.ts
│   │   │   ├── auth.api.ts    # Re-export từ api/endpoints
│   │   │   ├── auth.store.ts  # Zustand store cho auth
│   │   │   └── types.ts       # Types riêng của auth
│   │   ├── dashboard/
│   │   │   └── components/    # FoodProgress, TrendChart, MealCategoryButtons, MealLogGrid
│   │   └── profile/
│   │       └── components/    # Components riêng của profile (nếu có)
│   │
│   ├── shared/                 # DÙNG CHUNG – KHÔNG NGHIỆP VỤ
│   │   ├── components/
│   │   │   ├── ui/            # Button, Input, Modal, Card, Loading (UI components dùng chung)
│   │   │   └── layout/        # Header, Footer, MainLayout (Layout components)
│   │   ├── hooks/              # useDebounce, useLocalStorage, useMediaQuery
│   │   ├── types/              # api.types.ts, user.types.ts
│   │   └── constants/          # routes.ts
│   │
│   ├── api/                    # FE API LAYER (fetch/axios)
│   │   ├── http.ts             # Axios instance
│   │   ├── interceptors.ts     # Request/Response interceptors
│   │   └── endpoints.ts       # authApi, userApi
│   │
│   ├── store/                  # GLOBAL CLIENT STATE (optional)
│   │   └── app.store.ts       # Global store nếu cần
│   │
│   ├── lib/                    # Third-party configs
│   │   └── zod-schemas.ts     # Zod validation schemas
│   │
│   ├── utils/                  # PURE UTILS (không phụ thuộc vào React/Next)
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
│   └── env.ts                  # NEXT_PUBLIC_* environment variables
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

### Giải thích cấu trúc:

- **`app/`**: Next.js App Router - định nghĩa routes và layouts
- **`features/`**: Logic nghiệp vụ theo từng feature (auth, dashboard, profile)
  - Mỗi feature có `components/` riêng cho components đặc thù của feature đó
- **`shared/`**: Code dùng chung, không gắn với nghiệp vụ cụ thể
  - `shared/components/ui/`: UI components dùng chung (Button, Input, Modal, Card, Loading)
  - `shared/components/layout/`: Layout components (Header, Footer, MainLayout)
- **`api/`**: Layer gọi API (Axios instance, interceptors, endpoints)
- **`utils/`**: Pure utility functions (không phụ thuộc React/Next)
- **`lib/`**: Cấu hình cho các thư viện bên thứ ba
- **`styles/`**: SASS styles và Bootstrap customization

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
- **Axios**: 1.7.7+ (HTTP client với interceptors)
- **Note**: Đã loại bỏ React Query để tối ưu performance và giảm bundle size

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

## 📝 Quy ước Code

### Naming Conventions
- **Component names**: PascalCase (e.g., `Button`, `UserProfile`)
- **File names**: camelCase.tsx (e.g., `button.tsx`, `userProfile.tsx`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)
- **Functions**: camelCase (e.g., `getUserData`, `handleSubmit`)
- **Interfaces/Types**: PascalCase với prefix "I" cho interfaces (e.g., `IUser`, `IButtonProps`)

### File Structure
- Mỗi component có folder riêng với:
  - Component file: `ComponentName.tsx`
  - Styles: `ComponentName.module.scss`
  - Index: `index.ts` (export component và types)

### TypeScript
- Sử dụng strict mode
- Luôn định nghĩa types cho props, state, và functions
- Tránh sử dụng `any`, ưu tiên `unknown` nếu cần

### Code Style
- Sử dụng functional components với hooks
- Prefer named exports
- Comment cho các functions phức tạp
- Sử dụng ESLint và Prettier để đảm bảo code consistency

## 🔒 Environment Variables

### Server Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Port cho development/production server | `3000` | No (mặc định: 3000) |

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL cho API | `http://localhost:3000/api` |
| `NEXT_PUBLIC_APP_URL` | Base URL của ứng dụng | `http://localhost:3000` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | Tên ứng dụng | `React Test App` |
| `NEXT_PUBLIC_API_KEY` | API key cho external services | `your_api_key` |

**Lưu ý**: 
- Các biến môi trường bắt đầu với `NEXT_PUBLIC_` sẽ được expose ra client-side.
- `PORT` chỉ dùng ở server-side, không cần prefix `NEXT_PUBLIC_`.
- Nếu thay đổi `PORT`, nhớ cập nhật `NEXT_PUBLIC_API_URL` và `NEXT_PUBLIC_APP_URL` cho phù hợp.

## 🧪 Testing

### Chạy tests (khi đã setup)

```bash
npm test
```

## 📦 Build & Deploy

### Build cho Production

```bash
npm run build
```

### Deploy

Dự án có thể deploy lên:
- **Vercel** (khuyến nghị cho Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker container**

## 🤝 Contributing

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Commit Message Convention

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Thêm tính năng mới
- `fix`: Sửa lỗi
- `docs`: Cập nhật documentation
- `style`: Formatting, missing semi colons, etc
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Thêm tests
- `chore`: Build process, auxiliary tools
- `revert`: Revert previous commit

## 📄 License

[MIT License](LICENSE) - Xem file LICENSE để biết thêm chi tiết.

## 🆘 Troubleshooting

### Lỗi "Module not found"

```bash
# Xóa node_modules và cài đặt lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi TypeScript

```bash
# Kiểm tra types
npm run type-check

# Xóa cache TypeScript
rm -rf .next
npm run build
```

### Lỗi SASS

```bash
# Đảm bảo đã cài đặt sass
npm install sass --save-dev
```

### Port đã được sử dụng

```bash
# Cách 1: Sử dụng PORT từ environment variable
PORT=3001 npm run dev

# Cách 2: Sử dụng script với port
npm run dev:port  # Sử dụng PORT từ .env.local

# Cách 3: Set trực tiếp trong .env.local
# PORT=3001
```

### Lỗi "@next/swc-win32-x64-msvc is not a valid Win32 application" và "turbo.createProject is not supported"

**Nguyên nhân:**
- SWC native module bị corrupt hoặc không tương thích với hệ thống
- Next.js sẽ fallback sang WASM (chậm hơn 10-20 lần)
- Turbo mode không hoạt động với WASM bindings

**Cách fix (thử theo thứ tự):**

```bash
# Cách 1: Xóa cache và cài lại (khuyến nghị)
# Đóng tất cả terminal/editor đang mở trước
npm cache clean --force
rm -rf node_modules package-lock.json .next
npm install

# Cách 2: Nếu trên Windows PowerShell
npm cache clean --force
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install

# Cách 3: Rebuild native modules
npm rebuild

# Cách 4: Cài lại Next.js và SWC packages cụ thể
npm uninstall next
npm install next@latest
npm install @next/swc-win32-x64-msvc --save-optional

# Cách 5: Kiểm tra Node.js version (phải >= 18.17.0)
node --version
# Nếu version thấp, cập nhật Node.js
```

**Lưu ý**: 
- Nếu file bị lock (Access denied), hãy:
  1. Đóng tất cả terminal/editor đang mở
  2. Đóng các process Node.js đang chạy (Task Manager)
  3. Thử lại các bước trên
- Sau khi fix, ứng dụng sẽ nhanh hơn đáng kể (10-20 lần)
- Có thể dùng `npm run dev:turbo` sau khi fix để tăng tốc thêm

### Ứng dụng chạy chậm trong Development Mode

Nếu ứng dụng chạy chậm khi `npm run dev`, có thể do các nguyên nhân sau:

**1. SWC Native Module không load được (phổ biến trên Windows)**
- Next.js sẽ fallback sang WASM (chậm hơn nhiều)
- **Giải pháp**: Xem phần fix lỗi "@next/swc-win32-x64-msvc" ở trên

**2. Turbo Mode không hoạt động với WASM**
- Turbo mode chỉ hoạt động khi SWC native module load được
- Khi SWC fallback sang WASM, Turbo sẽ báo lỗi `turbo.createProject is not supported`
- **Giải pháp**: Fix SWC native module issue (xem phần 1) hoặc không dùng Turbo mode
- Script `dev` mặc định không dùng Turbo để tránh lỗi
- Nếu SWC native module hoạt động, có thể dùng `npm run dev:turbo`

**3. Middleware chạy trên quá nhiều routes**
- Middleware đã được tối ưu để bỏ qua static files
- Nếu vẫn chậm, kiểm tra logic trong `src/middleware.ts`

**4. Font loading từ Google Fonts**
- Font đã được tối ưu với `display: swap` và preload
- Sử dụng CSS variable để tối ưu hơn

**5. Bootstrap và SASS compilation**
- SASS đã được cấu hình với output style tối ưu
- Bootstrap được import một lần trong `globals.scss`

**6. Webpack cache bị lỗi**
```bash
# Xóa cache Next.js
rm -rf .next
npm run dev
```

**7. Quá nhiều dependencies**
- Đã loại bỏ các package không cần thiết (lodash-es, crypto-js, etc.)
- Chỉ giữ lại các package cần thiết

**Các tối ưu đã được áp dụng:**
- ✅ Webpack watch options tối ưu
- ✅ Middleware matcher tối ưu (bỏ qua static files)
- ✅ Font loading tối ưu (swap, preload, CSS variable)
- ✅ SASS compilation tối ưu
- ✅ Image optimization
- ✅ SWC minifier (default trong Next.js 15)

**Lưu ý về Turbo Mode:**
- Turbo mode chỉ hoạt động khi SWC native module load được
- Khi SWC fallback sang WASM, Turbo sẽ không hoạt động
- Script `dev` mặc định không dùng Turbo để tránh lỗi
- Sau khi fix SWC issue, có thể dùng `npm run dev:turbo` để tăng tốc

## 📚 Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Bootstrap Documentation](https://getbootstrap.com/docs)

## 👥 Authors

- Your Name - [linhnqdev](https://github.com/linhnqdev)

## 🙏 Acknowledgments

- Next.js team
- React team
- Tất cả các maintainers của các thư viện open source được sử dụng
