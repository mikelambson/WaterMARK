type Role = 'admin' | 'editor' | 'viewer' | 'guest' | 'superadmin';
type Permission = 'read' | 'write' | 'delete';

interface User {
  roles: Role[];
  permissions: Permission[];
}

function hasPermission(user: User, requiredPermission: Permission): boolean {
  if (user.permissions.includes(requiredPermission)) {
    return true;
  }

  for (const role of user.roles) {
    if (getRolePermissions(role).includes(requiredPermission)) {
      return true;
    }
  }

  return false;
}

function getRolePermissions(role: Role): Permission[] {
  const rolePermissions: { [key in Role]: Permission[] } = {
    admin: ['read', 'write', 'delete'],
    editor: ['read', 'write'],
    viewer: ['read'],
    guest: [],
    superadmin: ['read', 'write', 'delete'],
  };

  return rolePermissions[role] || [];
}

export { hasPermission };
export type { Role, Permission, User };
function hasRole(user: User, requiredRole: Role): boolean {
  return user.roles.includes(requiredRole);
}

export { hasRole };