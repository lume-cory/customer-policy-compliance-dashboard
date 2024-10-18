'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, ArrowLeft, AlertTriangle, Send, X, Upload, Link } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { hardcodedOptions, hardcodedRequirements, initialChatHistory } from './complianceData'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Requirement {
  id: string; 
  article: string;
  subArticle: string;
  regulationText: string;
  controlId?: string;
  controlCategory: string;
  controlText: string;
  confidenceInterval: number;
  policyId?: string;
  policyCategory?: string;
  suggestedPolicyCategory?: string;
  policyText?: string;
  suggestedPolicyText?: string;
  customerRequirements?: Array<{
    customerId: string;
    requirementText: string;
    status: 'compliant' | 'non-compliant';
    complianceGap?: string;
  }>;
}

function DetailedView({ requirement, onClose, regulation, securityControl, companyPolicy }: {
  requirement: Requirement;
  onClose: () => void;
  regulation: string;
  securityControl: string;
  companyPolicy: string;
}) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{regulation}</CardTitle>
        <Button onClick={onClose} variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mapping
        </Button>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">{requirement.article} - {requirement.subArticle}</h2>
        <Tabs defaultValue="regulation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="regulation">Regulation</TabsTrigger>
            <TabsTrigger value="security-control">Security Control</TabsTrigger>
            <TabsTrigger value="company-policy">Company Policy</TabsTrigger>
            <TabsTrigger value="customer-requirements">Customer Requirements</TabsTrigger>
          </TabsList>
          <TabsContent value="regulation">
            <Card>
              <CardHeader>
                <CardTitle>Requirement Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{requirement.regulationText}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security-control">
            <Card>
              <CardHeader>
                <CardTitle>Security Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {securityControl}</p>
                  <p><strong>Profile ID:</strong> {requirement.controlId || 'N/A'}</p>
                  <p><strong>Control Category:</strong> {requirement.controlCategory}</p>
                  <div>
                    <p className="font-semibold mb-2">Control Text:</p>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <pre className="whitespace-pre-wrap break-words text-sm">{requirement.controlText}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="company-policy">
            <Card>
              <CardHeader>
                <CardTitle>Company Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p><strong>Name:</strong> {companyPolicy}</p>
                  <p><strong>Mapping Confidence:</strong> {requirement.confidenceInterval}%</p>
                  <p><strong>{requirement.policyId ? 'Policy Category:' : 'Suggested Policy Category:'}</strong> {requirement.policyId ? requirement.policyCategory : requirement.suggestedPolicyCategory}</p>
                  <div>
                    <p className="font-semibold mb-2">{requirement.policyId ? 'Policy Text:' : 'Suggested Policy Text:'}</p>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <pre className="whitespace-pre-wrap break-words text-sm">{requirement.policyId ? requirement.policyText : requirement.suggestedPolicyText}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customer-requirements">
            <Card>
              <CardHeader>
                <CardTitle>Customer Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                {requirement.customerRequirements && requirement.customerRequirements.length > 0 ? (
                  <div className="space-y-4">
                    {requirement.customerRequirements.map((customerReq, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <p><strong>Customer:</strong> {customerReq.customerId}</p>
                        <p><strong>Requirement:</strong> {customerReq.requirementText}</p>
                        <p><strong>Status:</strong> 
                          <Badge className={`ml-2 ${customerReq.status === 'compliant' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {customerReq.status}
                          </Badge>
                        </p>
                        {customerReq.complianceGap && (
                          <p><strong>Compliance Gap:</strong> {customerReq.complianceGap}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No specific customer requirements for this regulation article.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}



function ChatInterface() {
  const [chatHistory, setChatHistory] = useState(initialChatHistory)
  const [message, setMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleSendMessage = (message: string) => {
    const newUserMessage = { role: 'user', content: message }
    setChatHistory(prevHistory => [...prevHistory, newUserMessage])
    
    // Simulate AI response (in a real application, this would call an API)
    setTimeout(() => {
      const aiResponse = { role: 'assistant', content: `I'm sorry, but I don't have enough information to answer that question accurately. In a real implementation, I would analyze the compliance mapping data and provide a specific answer based on the latest information available.` }
      setChatHistory(prevHistory => [...prevHistory, aiResponse])
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim()) {
      handleSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto p-4" ref={scrollAreaRef}>
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
        <Input
          type="text"
          placeholder="Ask a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  )
}

export function ComplianceMapperComponent() {
  const [regulation, setRegulation] = useState(hardcodedOptions.regulation[0])
  const [securityControl, setSecurityControl] = useState(hardcodedOptions.securityControl[0])
  const [companyPolicy, setCompanyPolicy] = useState(hardcodedOptions.companyPolicy[0])
  const [customerContract, setCustomerContract] = useState(hardcodedOptions.customerContracts[0])
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [showDashboard, setShowDashboard] = useState(false)
  const [notification, setNotification] = useState('')
  const [filterMode, setFilterMode] = useState('all')
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null)
  const [isAssistantOpen, setIsAssistantOpen] = useState(true)
  const [isAddNewOpen, setIsAddNewOpen] = useState(false)
  const [addNewType, setAddNewType] = useState<string | null>(null)
  const [newContentUrl, setNewContentUrl] = useState('')
  const [newContentFile, setNewContentFile] = useState<File | null>(null)

  const handleCreateMapping = () => {
    setRequirements(hardcodedRequirements as Requirement[])
    setShowDashboard(true)
    setNotification('Mapping created successfully!')
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const filteredRequirements = filterMode === 'all'
    ? requirements
    : requirements.filter(req => 
        req.controlId === null || 
        req.policyId === null || 
        (req.customerRequirements && req.customerRequirements.some(cr => cr.status === 'non-compliant'))
      )

  const toggleFilter = () => {
    setFilterMode(filterMode === 'all' ? 'missing' : 'all')
  }

  const handleRowClick = (requirement: Requirement) => {
    setSelectedRequirement(requirement)
  }

  const handleAddNewContent = () => {
    // Here you would implement the logic to handle the new content
    console.log('Adding new content:', addNewType, newContentUrl || newContentFile)
    // Reset the form
    setAddNewType(null)
    setNewContentUrl('')
    setNewContentFile(null)
    setIsAddNewOpen(false)
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={isAssistantOpen ? 80 : 100} minSize={50}>
          <div className="h-full overflow-auto">
            <div className="p-4 sm:p-6 md:p-8">
              {selectedRequirement ? (
                <DetailedView
                  requirement={selectedRequirement}
                  onClose={() => setSelectedRequirement(null)}
                  regulation={regulation}
                  securityControl={securityControl}
                  companyPolicy={companyPolicy}
                />
              ) : (
                <Card className="w-full mx-auto">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <CardTitle className="mb-4 sm:mb-0">Compliance Mapper</CardTitle>
                    <Dialog open={isAddNewOpen} onOpenChange={setIsAddNewOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add New
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Content</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Select value={addNewType || ''} onValueChange={setAddNewType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="regulation">Regulation URL</SelectItem>
                              <SelectItem value="security-control">Security Control URL</SelectItem>
                              <SelectItem value="company-policy">Upload Company Policy</SelectItem>
                              <SelectItem value="customer-contract">Upload Customer Contract Requirement</SelectItem>
                            </SelectContent>
                          </Select>
                          {addNewType && (addNewType === 'regulation' || addNewType === 'security-control') && (
                            <div className="flex items-center space-x-2">
                              <Input
                                type="url"
                                placeholder="Enter URL"
                                value={newContentUrl}
                                onChange={(e) => setNewContentUrl(e.target.value)}
                              />
                              <Button size="icon">
                                <Link className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          {addNewType && (addNewType === 'company-policy' || addNewType === 'customer-contract') && (
                            <div className="flex items-center space-x-2">
                              <Input
                                type="file"
                                onChange={(e) => setNewContentFile(e.target.files?.[0] || null)}
                              />
                              <Button size="icon">
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <Button onClick={handleAddNewContent} disabled={!addNewType || (!newContentUrl && !newContentFile)}>
                          Add Content
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="regulation" className="text-sm font-medium">
                            Regulation
                          </label>
                          <Select value={regulation} onValueChange={setRegulation}>
                            <SelectTrigger id="regulation">
                              <SelectValue>{regulation}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {hardcodedOptions.regulation.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="securityControl" className="text-sm font-medium">
                            Security Control
                          </label>
                          <Select value={securityControl} onValueChange={setSecurityControl}>
                            <SelectTrigger id="securityControl">
                              <SelectValue>{securityControl}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {hardcodedOptions.securityControl.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="companyPolicy" className="text-sm font-medium">
                            Company Policy
                          </label>
                          <Select value={companyPolicy} onValueChange={setCompanyPolicy}>
                            <SelectTrigger id="companyPolicy">
                              <SelectValue>{companyPolicy}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {hardcodedOptions.companyPolicy.map((option) => (
                                <SelectItem  key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="customerContract" className="text-sm font-medium">
                            Customer Contract
                          </label>
                          <Select value={customerContract} onValueChange={setCustomerContract}>
                            <SelectTrigger id="customerContract">
                              <SelectValue>{customerContract}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {hardcodedOptions.customerContracts.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Button onClick={handleCreateMapping} className="w-full">
                          Create Mapping
                        </Button>
                      </div>
                      {notification && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                          <span className="block sm:inline">{notification}</span>
                        </div>
                      )}
                      {showDashboard && (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <h2 className="text-lg font-semibold mb-2 sm:mb-0">Mapping Results</h2>
                            <Button onClick={toggleFilter} variant="outline" className="w-full sm:w-auto">
                              {filterMode === 'all' ? 'Show Missing Coverage' : 'Show All Mappings'}
                            </Button>
                          </div>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Article</TableHead>
                                  <TableHead>Sub-Article</TableHead>
                                  <TableHead>Requirement Description</TableHead>
                                  <TableHead>Control Category</TableHead>
                                  <TableHead>CRI Profile</TableHead>
                                  <TableHead>Security Policy ID</TableHead>
                                  <TableHead>Mapping Confidence Interval</TableHead>
                                  <TableHead>Customer Compliance</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredRequirements.map((req) => (
                                  <TableRow key={req.article + req.subArticle} onClick={() => handleRowClick(req)} className="cursor-pointer hover:bg-gray-100">
                                    <TableCell>{req.article}</TableCell>
                                    <TableCell>{req.subArticle}</TableCell>
                                    <TableCell>{req.regulationText}</TableCell>
                                    <TableCell>{req.controlCategory}</TableCell>
                                    <TableCell>{req.controlId || 'N/A'}</TableCell>
                                    <TableCell>{req.policyId || 'N/A'}</TableCell>
                                    <TableCell>{req.confidenceInterval ? `${req.confidenceInterval}%` : 'N/A'}</TableCell>
                                    <TableCell>
                                      
                                      {req.customerRequirements && req.customerRequirements.some(cr => cr.status === 'non-compliant') ? (
                                        <Badge className="bg-red-500">
                                          <AlertTriangle className="w-4 h-4 mr-1" />
                                          Non-Compliant
                                        </Badge>
                                      ) : (
                                        <Badge className="bg-green-500">Compliant</Badge>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </ResizablePanel>

        {isAssistantOpen && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={20} minSize={20}>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Compliance Assistant</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsAssistantOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex-grow overflow-hidden">
                  <ChatInterface />
                </div>
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {!isAssistantOpen && (
        <Button
          className="fixed bottom-4 right-4"
          onClick={() => setIsAssistantOpen(true)}
        >
          Open Assistant
        </Button>
      )}
    </div>
  )
}
