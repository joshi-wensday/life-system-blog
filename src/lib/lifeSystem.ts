// src/lib/lifeSystem.ts

export interface LifeSystemVersion {
    emoji: string;
    majorPatch: number;
    minorPatch: number;
  }
  
  export function compareVersions(a: LifeSystemVersion, b: LifeSystemVersion): number {
    if (a.majorPatch !== b.majorPatch) {
      return a.majorPatch - b.majorPatch;
    }
    return a.minorPatch - b.minorPatch;
  }
  
  export function formatVersion(version: LifeSystemVersion): string {
    return `${version.emoji}${version.majorPatch}.${version.minorPatch}`;
  }
  
  export function parseVersion(versionString: string): LifeSystemVersion {
    const match = versionString.match(/^(.)(\d+)\.(\d+)$/);
    if (!match) {
      throw new Error('Invalid version string');
    }
    return {
      emoji: match[1],
      majorPatch: parseInt(match[2], 10),
      minorPatch: parseInt(match[3], 10),
    };
  }