"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CreateProductForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nuevo Producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form>
          <DialogHeader>
            <DialogTitle>Nuevo Producto</DialogTitle>
            <DialogDescription>
              Complete la información técnica y de costos del producto.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                {/* Información General */}
                <Field>
                  <FieldLabel htmlFor="name">Nombre del Producto</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ej: Monitor Pro 24\"
                    required
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="sku">SKU</FieldLabel>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="PROD-001"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="barcode">Código de Barras</FieldLabel>
                    <Input id="barcode" name="barcode" placeholder="Opcional" />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="categoryId">Categoría</FieldLabel>
                  <Select name="categoryId" required>
                    <SelectTrigger id="categoryId">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Aquí vendría el map de tus categorías de Convex */}
                      <SelectItem value="cat_1">Electrónica</SelectItem>
                      <SelectItem value="cat_2">Hardware</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldGroup>
                {/* Inventario */}
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="stock">Stock Inicial</FieldLabel>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      defaultValue="0"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="minStock">Stock Mínimo</FieldLabel>
                    <Input
                      id="minStock"
                      name="minStock"
                      type="number"
                      defaultValue="5"
                      required
                    />
                    <FieldDescription>Alerta de reposición</FieldDescription>
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldGroup>
                {/* Costos y Margen */}
                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel htmlFor="baseCost">Costo Base (USD)</FieldLabel>
                    <Input
                      id="baseCost"
                      name="baseCost"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="profitMargin">Margen (%)</FieldLabel>
                    <Input
                      id="profitMargin"
                      name="profitMargin"
                      type="number"
                      placeholder="25"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="taxRateId">Impuesto</FieldLabel>
                    <Select name="taxRateId" required>
                      <SelectTrigger id="taxRateId">
                        <SelectValue placeholder="IVA" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Aquí vendría el map de tus tipos de impuestos */}
                        <SelectItem value="tax_1">IVA 21%</SelectItem>
                        <SelectItem value="tax_2">IVA 10.5%</SelectItem>
                        <SelectItem value="tax_3">Exento</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit">Guardar Producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
