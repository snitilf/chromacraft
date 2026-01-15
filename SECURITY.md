# API Key Security Best Practices

## ⚠️ Important: Your API Key Was Leaked

If you received a "403 Forbidden - API key was reported as leaked" error, it means your API key was exposed publicly (likely in a git commit, screenshot, or public repository).

## ✅ What We've Done

1. **Updated your `.env` file** with the new API key: `REDACTED_API_KEY`
2. **Verified `.env` is gitignored** - your local environment file is safe
3. **Confirmed the code uses environment variables** - no hardcoded keys

## 🔒 How to Prevent Future Leaks

### 1. **Never Commit API Keys to Git**

✅ **DO:**
- Store API keys in `.env` files (already gitignored)
- Use environment variables in your code
- Add `.env` to `.gitignore` (already done)

❌ **DON'T:**
- Commit `.env` files
- Hardcode API keys in source code
- Include API keys in commit messages
- Share API keys in screenshots or documentation

### 2. **Use Different Keys for Different Environments**

- **Development**: Use a key with limited permissions
- **Production**: Use a separate production key
- **Testing**: Use a test key if available

### 3. **Restrict API Key Permissions**

In Google Cloud Console:
1. Go to "APIs & Services" > "Credentials"
2. Edit your API key
3. Under "API restrictions", restrict to only the APIs you need
4. Under "Application restrictions", add IP or referrer restrictions if possible

### 4. **Monitor API Key Usage**

- Regularly check your Google Cloud Console for unusual activity
- Set up billing alerts
- Review API usage logs

### 5. **Rotate Keys Regularly**

- Rotate keys every 90 days or after any suspected leak
- Update keys in:
  - Local `.env` file
  - Vercel environment variables (Settings > Environment Variables)
  - Any other deployment platforms

## 🚨 If Your Key Was Leaked

### Immediate Actions:

1. **Revoke the leaked key** in Google Cloud Console
2. **Create a new key** (already done)
3. **Update all environments:**
   - Local `.env` file ✅ (already updated)
   - Vercel environment variables (see below)
   - Any other deployment platforms

### Update Vercel Environment Variables:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Find `GEMINI_API_KEY`
4. Update it with your new key: `REDACTED_API_KEY`
5. Make sure it's enabled for **Production**, **Preview**, and **Development** environments
6. Redeploy your application

### Clean Up Git History (If Needed):

⚠️ **Warning**: Only do this if you're the only contributor or have team approval.

If an API key was committed to git history:

```bash
# Option 1: Use git-filter-repo (recommended)
git filter-repo --replace-text <(echo "OLD_KEY==>NEW_KEY")

# Option 2: Use BFG Repo-Cleaner
# Download from: https://rtyley.github.io/bfg-repo-cleaner/
bfg --replace-text passwords.txt

# After cleaning, force push (coordinate with team first!)
git push origin --force --all
```

**Note**: Force pushing rewrites history. Only do this if:
- You're working alone, OR
- You coordinate with your entire team
- Everyone pulls the cleaned history

## 📋 Checklist for New Projects

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists with placeholder values
- [ ] No API keys in source code
- [ ] No API keys in commit messages
- [ ] Environment variables used in code (not hardcoded)
- [ ] API keys restricted in cloud console
- [ ] Different keys for dev/prod environments
- [ ] Team members know not to commit keys

## 🔍 How to Check for Exposed Keys

### Search Your Repository:

```bash
# Search for potential API keys in git history
git log --all --full-history --source -S "AIzaSy" 

# Search current codebase (should return nothing)
grep -r "AIzaSy" . --exclude-dir=node_modules

# Check if .env is tracked
git ls-files | grep "\.env"
```

### Use GitHub Secret Scanning:

If your repo is on GitHub, enable:
- **Settings** > **Security** > **Secret scanning**
- GitHub will automatically detect and alert you to exposed secrets

## 📚 Additional Resources

- [Google Cloud API Key Security](https://cloud.google.com/docs/authentication/api-keys)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

---

**Remember**: Once an API key is committed to git and pushed, consider it compromised forever, even if you delete it later. Always rotate keys immediately.
