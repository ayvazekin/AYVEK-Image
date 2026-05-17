#!/bin/bash

# A.Y.V.E.K Model Deployment System
# Structure: Data/Models/[SLOT]/[SLOT]_[VERSION].safetensors
# Example: Data/Models/A1/A1_4.safetensors

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

MODELS_DIR="stable-diffusion-webui/models/Stable-diffusion"
LORA_DIR="stable-diffusion-webui/models/Lora"
MODELS_ROOT="Data/Models"

echo -e "${BLUE}🧬 A.Y.V.E.K Model Lab Deployment${NC}"
echo "-------------------------------------"

if [ "$#" -ne 2 ]; then
    echo "Usage: ./deploy-model.sh [SLOT] [VERSION]"
    echo "Example: ./deploy-model.sh A1 4  (Deploys A1_4.safetensors)"
    exit 1
fi

SLOT=$1     # e.g., A1
VERSION=$2  # e.g., 4

# Construct expected filename: A1_4.safetensors
TARGET_FILE="${SLOT}_${VERSION}.safetensors"
SOURCE_PATH="$MODELS_ROOT/$SLOT/$TARGET_FILE"

echo -e "Looking for: ${YELLOW}$SOURCE_PATH${NC}"

if [ ! -f "$SOURCE_PATH" ]; then
    echo -e "${RED}Error: File not found!${NC}"
    echo "Expected path: $SOURCE_PATH"
    echo "Please ensure your model file is named correctly."
    exit 1
fi

echo -e "${BLUE}Deploying $TARGET_FILE...${NC}"

# Deploy Logic
# Check size to determine LoRA vs Checkpoint
SIZE=$(stat -f%z "$SOURCE_PATH")
if [ $SIZE -lt 500000000 ]; then
    # < 500MB -> LoRA
    DEST="$LORA_DIR/ayvek_sdxl_lora.safetensors"
    TYPE="LoRA"
else
    # > 500MB -> Checkpoint
    DEST="$MODELS_DIR/ayvek_base.safetensors"
    TYPE="Checkpoint"
fi

# Copy/Overwrite
cp "$SOURCE_PATH" "$DEST"

echo -e "${GREEN}✓ Success! $TYPE active.${NC}"
echo -e "${YELLOW}System ready for: $SLOT Version $VERSION${NC}"
