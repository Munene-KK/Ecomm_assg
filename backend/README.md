# backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/server.ts
```

To type check:

```bash
bun check
```

Optional email notifications:

Add the following environment variables to enable checkout confirmation emails:

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Infinyte <your-email@gmail.com>"
```

If these are not configured, the app still completes checkout successfully and logs that email delivery was skipped.
