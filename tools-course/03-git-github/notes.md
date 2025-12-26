# Git Setup Notes

## Binary Files Policy
We do not commit binary files (zip, tar, exe, mp4) because:
1. Git is designed for text, not large blobs.
2. They bloat the repository size forever.
3. You cannot "diff" (compare) them easily.

## SSH Setup
* Key generated: Ed25519
* Added to GitHub: Yes