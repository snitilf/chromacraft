# 🚨 URGENT: API Key Leak Fix Instructions

## The Problem

Your API key was committed to a **PUBLIC GitHub repository** in commit `2023890`. Google's secret scanning automatically detected it and marked it as leaked. Even though we've removed it from the current files, **it's still visible in your git history on GitHub**.

## ⚠️ Current Status

- ✅ Repository: **PUBLIC** (visible to everyone)
- ✅ API key exposed in commit: `2023890 update to API key leak`
- ✅ Key visible in: `SECURITY.md` file in git history
- ✅ Google has already detected and blocked the key

## 🔧 Step-by-Step Fix

### Step 1: Create a NEW API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Delete/Revoke** all old/leaked keys from Google Cloud Console
3. Create a **brand new** API key
4. **DO NOT** share it, commit it, or put it anywhere except:
   - Your local `.env` file
   - Vercel environment variables

### Step 2: Update Local Environment

```bash
# Update your .env file with the NEW key
echo "GEMINI_API_KEY=YOUR_NEW_KEY_HERE" > .env
```

### Step 3: Update Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your ChromaCraft project
3. Go to **Settings** > **Environment Variables**
4. Update `GEMINI_API_KEY` with your **NEW** key
5. Enable for: Production, Preview, Development
6. **Redeploy** your application

### Step 4: Clean Git History (IMPORTANT)

Since your repo is public, you need to remove the exposed key from git history:

#### Option A: Use git-filter-repo (Recommended)

```bash
# Install git-filter-repo if needed
# macOS: brew install git-filter-repo
# Or: pip install git-filter-repo

# Remove the exposed key from all history
git filter-repo --replace-text <(echo "YOUR_LEAKED_KEY==>REDACTED_API_KEY")

# Force push (WARNING: This rewrites history!)
git push origin --force --all
git push origin --force --tags
```

#### Option B: Use BFG Repo-Cleaner

```bash
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Create a file with the key to remove
echo "YOUR_LEAKED_KEY" > keys.txt

# Clean the repository
java -jar bfg.jar --replace-text keys.txt

# Force push
git push origin --force --all
```

#### Option C: Manual Clean (If you're the only contributor)

```bash
# Interactive rebase to remove the commit
git rebase -i 2023890^
# Mark the commit as 'edit' or 'drop'

# Or use git filter-branch (slower but works)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch SECURITY.md" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

⚠️ **WARNING**: Force pushing rewrites git history. If others have cloned your repo, they'll need to re-clone it.

### Step 5: Verify the Fix

```bash
# Check that the key is no longer in history
git log --all --full-history --source -S "YOUR_LEAKED_KEY"

# Should return nothing (or only show this file)
```

### Step 6: Enable GitHub Secret Scanning

1. Go to your GitHub repo: `https://github.com/snitilf/chromacraft`
2. Go to **Settings** > **Security** > **Secret scanning**
3. Enable **Secret scanning alerts**
4. GitHub will automatically scan and alert you if keys are exposed

## 🛡️ Prevention Rules

**NEVER:**
- ❌ Commit API keys to git (even in "security" files)
- ❌ Put API keys in documentation
- ❌ Share API keys in screenshots
- ❌ Put API keys in commit messages
- ❌ Put API keys in code comments

**ALWAYS:**
- ✅ Store keys in `.env` (gitignored)
- ✅ Use environment variables in code
- ✅ Add `.env` to `.gitignore` (already done)
- ✅ Use placeholder text in example files
- ✅ Review files before committing

## 📝 Checklist

- [ ] Created NEW API key in Google Cloud Console
- [ ] Revoked OLD API key
- [ ] Updated local `.env` file with NEW key
- [ ] Updated Vercel environment variables with NEW key
- [ ] Cleaned git history to remove exposed key
- [ ] Force pushed cleaned history (if needed)
- [ ] Enabled GitHub Secret Scanning
- [ ] Tested the application with new key
- [ ] Verified no keys in current codebase: `grep -r "AIzaSy" . --exclude-dir=node_modules`

## 🔍 How to Check for Future Leaks

```bash
# Before every commit, check for API keys
grep -r "AIzaSy" . --exclude-dir=node_modules --exclude-dir=.git

# Check git history before pushing
git log -p --all -S "AIzaSy" | head -50
```

---

**Remember**: Once a key is in a public git repository, consider it compromised forever. Always create a new key immediately.
