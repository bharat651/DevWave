#!/bin/bash

echo "🚀 Learning Management System - Database Setup"
echo "=============================================="

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed or not in PATH"
    exit 1
fi

echo "✓ PostgreSQL found"

# Database configuration
DB_NAME="learning_db"
DB_USER="postgres"

echo ""
echo "Creating database: $DB_NAME"

# Create database
createdb -U $DB_USER $DB_NAME 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✓ Database created successfully"
else
    echo "⚠️  Database might already exist (this is OK)"
fi

echo ""
echo "Running schema..."

# Run schema
psql -U $DB_USER -d $DB_NAME -f schema.sql
if [ $? -eq 0 ]; then
    echo "✓ Schema created successfully"
else
    echo "❌ Failed to create schema"
    exit 1
fi

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with correct credentials"
echo "2. Run: npm run dev"
echo ""
