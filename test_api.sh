#!/bin/bash

# Test script for OctoFit Tracker API endpoints
# This script tests the API after the Django server is started via launch.json

# Configuration
API_BASE_URL="http://localhost:8000/api"

echo "=========================================="
echo "OctoFit Tracker API Test"
echo "=========================================="
echo ""
echo "Testing endpoints at: $API_BASE_URL"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test API root endpoint
echo -e "${YELLOW}Testing API root endpoint...${NC}"
curl -s -X GET "$API_BASE_URL/" | jq . || echo "API root endpoint not accessible"
echo ""

# Test activities endpoint
echo -e "${YELLOW}Testing /api/activities/ endpoint...${NC}"
curl -s -X GET "$API_BASE_URL/activities/" | jq . || echo "Activities endpoint not accessible"
echo ""

# Test teams endpoint
echo -e "${YELLOW}Testing /api/teams/ endpoint...${NC}"
curl -s -X GET "$API_BASE_URL/teams/" | jq . || echo "Teams endpoint not accessible"
echo ""

# Test leaderboard endpoint
echo -e "${YELLOW}Testing /api/leaderboard/ endpoint...${NC}"
curl -s -X GET "$API_BASE_URL/leaderboard/" | jq . || echo "Leaderboard endpoint not accessible"
echo ""

# Test workouts endpoint
echo -e "${YELLOW}Testing /api/workouts/ endpoint...${NC}"
curl -s -X GET "$API_BASE_URL/workouts/" | jq . || echo "Workouts endpoint not accessible"
echo ""

echo -e "${GREEN}API testing complete!${NC}"
