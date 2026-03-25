import { Button } from "@/components/ui/button"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr"

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Lista de Productos
          </h1>
          <p className="text-muted-foreground">
            Gestiona el inventario de tu negocio
          </p>
        </div>
        <Button>
          <PlusIcon weight="bold" className="mr-2 size-4" />
          Añadir Producto
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-muted/30 p-12">
        <div className="text-center">
          <p className="text-muted-foreground">
            No hay productos en el inventario
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Comienza añadiendo tu primer producto
          </p>
        </div>
      </div>
    </div>
  )
}
