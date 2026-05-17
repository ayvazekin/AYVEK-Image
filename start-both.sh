#!/bin/bash

echo "🚀 A.Y.V.E.K Web ve Engine başlatılıyor..."
echo ""

# A.Y.V.E.K_Web'i port 3000'de başlat
echo "📱 A.Y.V.E.K_Web başlatılıyor (http://localhost:3000)..."
(cd Web/A.Y.V.E.K_Web && npm run dev) &
WEB_PID=$!

# A.Y.V.E.K_Engine'i port 3001'de başlat
echo "🎨 A.Y.V.E.K_Engine başlatılıyor (http://localhost:3001)..."
(cd Web/A.Y.V.E.K_Engine && npm run dev) &
ENGINE_PID=$!

echo ""
echo "✅ Her iki proje de başlatıldı!"
echo "   - A.Y.V.E.K_Web: http://localhost:3000"
echo "   - A.Y.V.E.K_Engine: http://localhost:3001"
echo ""
echo "Durdurmak için Ctrl+C'ye basın"

# Ctrl+C ile her iki process'i de durdur
trap "kill $WEB_PID $ENGINE_PID; exit" INT

wait
