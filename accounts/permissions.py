from rest_framework import permissions


class IsStaffOrSelf(permissions.BasePermission):
    """
    Permiso personalizado para permitir solo a los miembros del personal o al propio usuario editar su cuenta.
    """

    def has_permission(self, request, view):
        # Permitir que todos los usuarios creen nuevas cuentas
        if view.action == 'create':
            return True

        # Solo permitir que los usuarios autenticados realicen otras acciones
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Permitir que los miembros del personal realicen cualquier acción
        if request.user.is_staff:
            return True

        # Solo permitir que los usuarios en el grupo 'user' actualicen su propia cuenta
        if view.action in ['update', 'partial_update']:
            return obj == request.user and request.user.groups.filter(name='user').exists()

        # Denegar todas las demás acciones
        return False
