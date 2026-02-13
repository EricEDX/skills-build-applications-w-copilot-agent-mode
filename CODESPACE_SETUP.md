# OctoFit Tracker Codespace Setup - Configuration Guide

## Summary of Changes Made

### 1. Updated `settings.py`
**File**: `octofit-tracker/backend/octofit_tracker/settings.py`

- Added `import os` at the top of the file
- Updated `ALLOWED_HOSTS` configuration to support both localhost and Codespace environments:
  ```python
  ALLOWED_HOSTS = ['localhost', '127.0.0.1']
  if os.environ.get('CODESPACE_NAME'):
      ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")
  ```

### 2. Updated `urls.py`
**File**: `octofit-tracker/backend/octofit_tracker/urls.py`

- Added `import os` for environment variable access
- Modified the `api_root()` function to dynamically return URLs based on the environment:
  - If running in Codespace: Returns URLs with the pattern `https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/`
  - If running locally: Returns URLs with the pattern `http://localhost:8000/api/[component]/`
- Updated URL patterns to include `/api/` prefix:
  - Changed `path('', api_root, ...)` to `path('api/', api_root, ...)`
  - Changed `path('', include(router.urls))` to `path('api/', include(router.urls))`

## API Endpoints Configuration

### Endpoint Format in Codespace
```
https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/
```

### Example Endpoints
- **Activities**: `https://$CODESPACE_NAME-8000.app.github.dev/api/activities/`
- **Teams**: `https://$CODESPACE_NAME-8000.app.github.dev/api/teams/`
- **Leaderboard**: `https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard/`
- **Workouts**: `https://$CODESPACE_NAME-8000.app.github.dev/api/workouts/`

### Local Development
When running locally, use:
```
http://localhost:8000/api/[component]/
```

## Starting the Django Server via VS Code

### Method 1: Using launch.json (Recommended for VS Code)
The `.vscode/launch.json` is pre-configured with the Django launch configuration:

1. Open the Run and Debug panel (Ctrl+Shift+D on Windows/Linux, Cmd+Shift+D on Mac)
2. Select **"Launch Django Backend"** from the dropdown
3. Click the play button to start the server
4. The server will start on `0.0.0.0:8000`

### Method 2: Manual Terminal Command
If you prefer to run the server manually:

```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

## Testing the API

### Prerequisites
- Django server must be running (via launch.json or terminal)
- MongoDB must be running (already configured and running)

### Testing with curl

```bash
# Test API root endpoint (get all available endpoints)
curl -X GET http://localhost:8000/api/

# Test activities endpoint
curl -X GET http://localhost:8000/api/activities/

# Test teams endpoint
curl -X GET http://localhost:8000/api/teams/

# Test leaderboard endpoint
curl -X GET http://localhost:8000/api/leaderboard/

# Test workouts endpoint
curl -X GET http://localhost:8000/api/workouts/
```

### Automated Test Script
A test script has been created at `test_api.sh` that runs all API endpoint tests:

```bash
./test_api.sh
```

## Environment Verification

To verify that the environment variables are correctly set:

```bash
# Check if CODESPACE_NAME is set
echo $CODESPACE_NAME

# Verify MongoDB is running
ps aux | grep mongod
```

## Files Modified

1. ✅ `octofit-tracker/backend/octofit_tracker/settings.py`
2. ✅ `octofit-tracker/backend/octofit_tracker/urls.py`

## Next Steps

1. Start the Django server via VS Code launch.json
2. Verify the server is running by checking the terminal output
3. Run the API test script or use curl commands to test endpoints
4. Monitor the console output for any errors

## Troubleshooting

### Server won't start
- Ensure MongoDB is running: `ps aux | grep mongod`
- Check that port 8000 is available
- Verify Python dependencies are installed: `pip install -r requirements.txt`

### Certificate Issues (HTTPS)
- The configuration uses environment-based URL switching to handle HTTPS properly
- Codespace will handle HTTPS certificates automatically
- Local development uses HTTP

### Database Issues
- MongoDB should be running on `localhost:27017`
- Check MongoDB status: `ps aux | grep mongod`
- Verify MongoDB connection in `settings.py` (line shows `'port': 27017`)
