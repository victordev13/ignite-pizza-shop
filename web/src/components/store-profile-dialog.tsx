import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  ManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchemaType = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ['managed-restaurant'],
    staleTime: Infinity,
  })

  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchemaType>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name || '',
      description: managedRestaurant?.description || '',
    },
  })

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchemaType) {
    const cached = queryClient.getQueryData<ManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      /**
       * alterar dados do cache do react-query para ser replicados em tela
       * sem a necessidade de um novo request get para consultar as informações atualizadas
       * */
      queryClient.setQueryData<ManagedRestaurantResponse>(
        ['managed-restaurant'],
        { ...cached, name, description },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({
        name,
        description,
      })

      /**
       * Retornar as informações anteriores no contexto para usar no `onError`
       */
      return { previousProfileData: cached }
    },
    /**
     * Em caso de erro ao atualizar o perfil, volta os dados anteriores
     */
    onError(_, __, context) {
      if (context?.previousProfileData) {
        updateManagedRestaurantCache(context.previousProfileData)
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfileSchemaType) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
